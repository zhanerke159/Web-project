from rest_framework import serializers
from .models import Category, Product, Recipe, Review, UserProfile

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializers(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'description', 'category', 'image', 'time', 'author', 'author_name', 'recipe']

    def get_author_name(self, obj):
        if not obj.author:
            return 'Unknown chef'

        profile = getattr(obj.author, 'userprofile', None)

        if profile and profile.user_name:
            return profile.user_name

        return obj.author.username


class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = '__all__'
        read_only_fields = ['author']

    def create(self, validated_data):
        request = self.context.get('request')

        recipe = Recipe.objects.create(
            author=request.user,
            **validated_data
        )

        Product.objects.create(
            name=recipe.title,
            description=recipe.description,
            category=recipe.category,
            image=recipe.image,
            time=recipe.prep_time,
            author=recipe.author,
            recipe=recipe
        )

        return recipe


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
