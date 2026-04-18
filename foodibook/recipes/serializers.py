from rest_framework import serializers
from .models import Category, Product, Recipe, Review, UserProfile

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializers(serializers.ModelSerializer):
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'image', 'time','author', 'author_name']

class RecipeSerializers(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = ['id', 'title', 'image', 'description', 'category', 'ingredients', 'prep_time', 'instructions']


class ReviewSerializers(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['user', 'recipe', 'rating', 'comment', 'created_at']

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'user', 'first_name', 'user_name', 'last_name', 
            'phone_number', 'birth_date', 'avatar', 'bio'
        ]

class UserRegistrationSerializers(serializers.Serializer):
        username = serializers.CharField(max_length =100)
        email = serializers.EmailField()
        password = serializers.CharField(write_only=True, style={'input_type': 'password'})
        confirm_password = serializers.CharField(write_only=True, style={'input_type': 'password'})

        def validate(self, data):
            if(data['password'] != data['confirm_password']):
                raise serializers.ValidationError("Password must match.")
            return data

class RecipeSearchSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)  
    category = serializers.CharField(required=False)  
    ingredient = serializers.CharField(required=False)  
    min_rating = serializers.FloatField(required=False) 
    max_time = serializers.IntegerField(required=False)  
