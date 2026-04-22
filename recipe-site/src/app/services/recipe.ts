import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Recipe } from '../models/recipe';
import { Review } from '../models/review';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/`);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}/`);
  }

  updateRecipe(id: number, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(
      `${this.baseUrl}/recipes-update/${id}/`,
      recipeData
    );
  }

  searchRecipes(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/search/?title=${title}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/category/`);
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/review/`);
  }

  createReview(review: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/review/`, review);
  }

  deleteReview(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/review/${id}/`);
  }

  register(data: any) {
    return this.http.post(`${this.baseUrl}/register/`, data);
  }

  login(data: any) {
    return this.http.post(`${this.baseUrl}/token/`, data);
  }

  createRecipe(recipeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipes/`, recipeData);
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/me/`);
  }

  getRecipesByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recipes/?category=${categoryId}`);
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/?category=${categoryId}`);
  }

  getProduct(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/products/${id}/`);
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/user/me/`, userData);
  }

  change_password(passwordData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/change-password/`, passwordData);
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/me/`);
  }

  addToFavorites(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorite/${id}/`, {});
  }

  removeFromFavorites(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favorite-remove/${id}/`);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/recipes/${id}/`);
  }

  getPopularProducts(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/popular/`);
  }
}