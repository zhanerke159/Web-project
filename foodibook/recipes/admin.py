from django.contrib import admin
from .models import Category, Product, Recipe, Review, UserProfile
admin.site.register(Category)
admin.site.register(Product)
admin.site.register(Recipe)

admin.site.register(Review)
admin.site.register(UserProfile)


