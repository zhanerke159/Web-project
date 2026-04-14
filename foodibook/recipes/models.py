from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Recipe(models.Model):
    title = models.CharField(max_length=100)
    image = models.TextField(blank=True, null=True)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='recipes', on_delete=models.CASCADE)
    ingredients = models.TextField()
    prep_time = models.IntegerField(default=10)
    instructions = models.TextField() 
    
    author = models.ForeignKey(User, related_name='recipes', on_delete=models.CASCADE)
    
    

    def __str__(self):
        return self.title
    
class Product(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    category = models.ForeignKey(Category, related_name='products', on_delete=models.CASCADE)
    image = models.CharField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.name

class Review(models.Model):
    user = models.ForeignKey(User, related_name='reviews', on_delete=models.CASCADE)
    recipe = models.ForeignKey(Recipe, related_name='reviews', on_delete=models.CASCADE)
    rating = models.IntegerField()
    comment = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Review by {self.user.username} on {self.recipe.title}"

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, blank=True)
    user_name = models.CharField(max_length=100, blank=True) # Важно!
    last_name = models.CharField(max_length=100, blank=True)
    phone_number = models.CharField(max_length=20, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    favorites = models.ManyToManyField(Product, blank=True)

    def __str__(self):
        return self.user.username