from django.contrib import admin
from .models import Category, Product, Recipe, Review, UserProfile

admin.site.register(Review)
admin.site.register(UserProfile)

@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'category')

# Рецепты с отображением ID
@admin.register(Recipe)
class RecipeAdmin(admin.ModelAdmin):
    list_display = ('id', 'title')