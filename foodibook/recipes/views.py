from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status, viewsets
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import update_session_auth_hash

from .models import Product, Category, Recipe, Review, UserProfile
from .serializers import (
    RecipeSerializer,
    ReviewSerializers,
    UserSerializers,
    ProductSerializers,
    CategorySerializers,
    RecipeSearchSerializer,
    UserRegistrationSerializers
)


class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers
    permission_classes = [AllowAny]


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers
    permission_classes = [AllowAny]

    def get_queryset(self):
        queryset = Product.objects.all()
        category_id = self.request.query_params.get('category')

        if category_id:
            queryset = queryset.filter(category_id=category_id)

        return queryset


class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save()


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializers
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

    def perform_create(self, serializer):
        serializer.save()


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
    query = request.query_params.get('title', '')
    products = Product.objects.filter(name__icontains=query)
    serializer = ProductSerializers(products, many=True)
    return Response(serializer.data)


@api_view(['PUT'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def update_recipe(request, pk):
    try:
        recipe = Recipe.objects.get(pk=pk)
    except Recipe.DoesNotExist:
        return Response({"detail": "Recipe not found."}, status=status.HTTP_404_NOT_FOUND)

    serializer = RecipeSerializer(recipe, data=request.data, partial=True, context={'request': request})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = UserRegistrationSerializers(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']

        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "Username already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "Email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        User.objects.create_user(
            username=username,
            email=email,
            password=serializer.validated_data['password']
        )

        return Response(
            {"message": "User created successfully"},
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def add_to_favorites(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        user_profile, created = UserProfile.objects.get_or_create(user=request.user)

        user_profile.favorites.add(product)
        return Response(
            {"message": f"Продукт '{product.name}' добавлен в избранное"},
            status=status.HTTP_200_OK
        )

    except Product.DoesNotExist:
        return Response({"error": "Продукт не найден в базе данных!"}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def remove_from_favorites(request, pk):
    try:
        product = Product.objects.get(pk=pk)
        user_profile = UserProfile.objects.get(user=request.user)

        if product in user_profile.favorites.all():
            user_profile.favorites.remove(product)
            return Response({"message": "Удалено из избранного"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"error": "Продукта нет в избранном"}, status=status.HTTP_400_BAD_REQUEST)

    except Product.DoesNotExist:
        return Response({"error": "Продукт не найден"}, status=status.HTTP_404_NOT_FOUND)


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
    my_recipes_data = RecipeSerializer(Recipe.objects.filter(author=user), many=True).data
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
    serializer = RecipeSerializer(data=data, context={'request': request})

    if serializer.is_valid():
        recipe = serializer.save()
        return Response(RecipeSerializer(recipe, context={'request': request}).data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def change_password(request):
    user = request.user
    current_password = request.data.get("current_password")
    new_password = request.data.get("new_password")

    if not user.check_password(current_password):
        return Response({'error': 'Старый пароль введен неправильно'}, status=status.HTTP_400_BAD_REQUEST)

    if new_password:
        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)
        return Response({"message": "Пароль успешно изменен"}, status=200)

    return Response({"error": "Новый пароль не указан"}, status=400)