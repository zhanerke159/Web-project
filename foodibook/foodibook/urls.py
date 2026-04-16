"""
URL configuration for foodibook project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from recipes.views import search_recipes, register_user
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from recipes.views import CategoryViewSet, ProductViewSet, RecipeViewSet, ReviewViewSet, UserProfileViewSet, create_recipe
from rest_framework_simplejwt import views as jwt_views
from recipes.views import search_recipes, add_to_favorites, get_my_profile, change_password, remove_from_favorites

router = DefaultRouter()
router.register(r'category', CategoryViewSet)
router.register(r'products', ProductViewSet, basename='products')
router.register(r'review', ReviewViewSet)
router.register(r'recipes', RecipeViewSet)
router.register(r'user', UserProfileViewSet)



urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', jwt_views.TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', jwt_views.TokenRefreshView.as_view(), name='token_refresh'),

    path('api/recipes/search/', search_recipes, name='search_recipes'),
    path('api/register/', register_user, name='register'),
    path('api/user/me/', get_my_profile, name='my_profile'),
    path('api/favorite/<int:pk>/', add_to_favorites, name='add_favorite'),
    path('api/favorite-remove/<int:pk>/', remove_from_favorites, name='remove_favorite'),
    path('api/user/change-password/', change_password, name='change_password'),

    path('api/', include(router.urls)), 
]
