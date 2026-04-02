
from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Product, Category, Recipe, Review, UserProfile
from .serializers import RecipeSerializers, ReviewSerializers, UserSerializers, ProductSerializers, CategorySerializers, RecipeSearchSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializers


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializers

class RecipeViewSet(viewsets.ModelViewSet):
    queryset = Recipe.objects.all()
    serializer_class = RecipeSerializers


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializers

class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserSerializers

@api_view(['GET'])
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
        serializer.save()  # Сохраняем обновленный рецепт
        return Response(serializer.data)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)