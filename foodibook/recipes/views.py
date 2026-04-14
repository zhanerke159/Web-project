from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import Product, Category, Recipe, Review, UserProfile
from .serializers import (
    RecipeSerializers, ReviewSerializers, UserSerializers, 
    ProductSerializers, CategorySerializers, RecipeSearchSerializer, 
    UserRegistrationSerializers
)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializers

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializers

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializers

    def update(self, request, *args, **kwargs):
        instance = UserProfile.objects.get(user=request.user)
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def search_recipes(request):
    serializer = RecipeSearchSerializer(data=request.query_params)
    if serializer.is_valid():
        filters = {}
        if 'title' in serializer.validated_data:
            filters['title__icontains'] = serializer.validated_data['title']
        if 'category' in serializer.validated_data:
            filters['category__name__icontains'] = serializer.validated_data['category']
        if 'ingredient' in serializer.validated_data:
            filters['ingredients__icontains'] = serializer.validated_data['ingredient']
        if 'max_time' in serializer.validated_data:
            filters['prep_time__lte'] = serializer.validated_data['max_time']
        recipes = Recipe.objects.filter(**filters)
        return Response({"recipes": [recipe.title for recipe in recipes]})
    return Response(serializer.errors, status=400)

@api_view(['PUT'])
def update_recipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
        return Response({"detail": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)
    serializer = RecipeSerializers(recipe, data=request.data)
    if serializer.is_valid():
        serializer.save() 
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializers(data=request.data)
    if serializer.is_valid():
        user = User.objects.create_user(
            username=serializer.validated_data['username'],
            email=serializer.validated_data['email'],
            password=serializer.validated_data['password']
        )
        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_to_favorites(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)
        
        user_profile.favorites.add(product) 
        return Response({"message": f"Продукт '{product.name}' добавлен в избранное"}, status=status.HTTP_200_OK)
        
    except Product.DoesNotExist:
        return Response({"error": "Продукт не найден в базе данных!"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['GET', 'PATCH'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_my_profile(request):
    user = request.user
    user_profile, created = UserProfile.objects.get_or_create(user=user)
    
    if request.method == 'PATCH':
        serializer = UserSerializers(user_profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    favorites_data = ProductSerializers(user_profile.favorites.all(), many=True).data 
    my_recipes_data = RecipeSerializers(Recipe.objects.filter(author=user), many=True).data
    profile_serializer = UserSerializers(user_profile)

    return Response({
        "username": user.username,
        "email": user.email,
        "favorites": favorites_data, 
        "my_recipes": my_recipes_data,
        "profile": profile_serializer.data
    })


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def create_recipe(request):
    data = request.data.copy()
    serializer = RecipeSerializers(data = data)

    if serializer.is_valid():
        serializer.save(author=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)