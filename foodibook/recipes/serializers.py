from rest_framework import serializers
from .models import Category, Product, Recipe, Review, UserProfile

class CategorySerializers(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']


class ProductSerializers(serializers.ModelSerializer):
    author_name = serializers.SerializerMethodField()
    average_rating = serializers.SerializerMethodField()
    reviews_count = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'description', 'category', 'image', 'time',
            'author', 'author_name', 'recipe',
            'average_rating', 'reviews_count'
        ]

    def get_author_name(self, obj):
        if not obj.author:
            return 'Unknown chef'

        profile = getattr(obj.author, 'userprofile', None)

        if profile and profile.user_name:
            return profile.user_name

        return obj.author.username

    def get_average_rating(self, obj):
        if not obj.recipe:
            return 0

        reviews = obj.recipe.reviews.all()
        if not reviews.exists():
            return 0

        avg = sum(review.rating for review in reviews) / reviews.count()
        return round(avg, 1)

    def get_reviews_count(self, obj):
        if not obj.recipe:
            return 0
        return obj.recipe.reviews.count()

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
    username = serializers.SerializerMethodField()

    class Meta:
        model = Review
        fields = ['user', 'username', 'recipe', 'rating', 'comment', 'created_at']
        read_only_fields = ['user', 'created_at']

    def get_username(self, obj):
        return obj.user.username

    def create(self, validated_data):
        request = self.context.get('request')
        return Review.objects.create(user=request.user, **validated_data)

class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = [
            'user', 'first_name', 'user_name', 'last_name',
            'phone_number', 'birth_date', 'avatar', 'bio'
        ]


class UserRegistrationSerializers(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, style={'input_type': 'password'})
    confirm_password = serializers.CharField(write_only=True, style={'input_type': 'password'})

    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Password must match.")
        return data


class RecipeSearchSerializer(serializers.Serializer):
    title = serializers.CharField(required=False)
    category = serializers.CharField(required=False)
    ingredient = serializers.CharField(required=False)
    min_rating = serializers.FloatField(required=False)
    max_time = serializers.IntegerField(required=False)