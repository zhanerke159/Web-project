import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('user_token');

    if (token) {
      return new HttpHeaders({
        Authorization: `Bearer ${token}`
      });
    }

    return new HttpHeaders();
  }
  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/`);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}/`);
  }

  updateRecipe(id: number, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(
      `${this.baseUrl}/recipes-update/${id}/`,
      recipeData,
      { headers: this.getHeaders() }
    );
  }

  searchRecipes(title: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/recipes/search/?title=${title}`);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/`);
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews/`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews/`, review, {
      headers: this.getHeaders()
    });
  }

  register(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/register/', data);
  }

  login(data: any) {
    return this.http.post('http://127.0.0.1:8000/api/token/', data);
  }

  createRecipe(recipeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipes/`, recipeData, {
      headers: this.getHeaders()
    });
  }

  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/me/`, {
      headers: this.getHeaders()
    });
  }

  getRecipesByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/recipes/?category=${categoryId}`, {
      headers: this.getHeaders()
    });
  }

  getProductsByCategory(categoryId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/products/?category=${categoryId}`, {
      headers: this.getHeaders()
    });
  }

  updateUserProfile(userData: any): Observable<any> {
    return this.http.patch(`${this.baseUrl}/user/me/`, userData, {
      headers: this.getHeaders()
    });
  }

  change_password(passwordData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/user/change-password/`, passwordData, {
      headers: this.getHeaders()
    });
  }

  getFavorites(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/me/`, {
      headers: this.getHeaders()
    });
  }

  addToFavorites(id: number): Observable<any> {
    return this.http.post(`${this.baseUrl}/favorite/${id}/`, {}, {
      headers: this.getHeaders()
    });
  }

  removeFromFavorites(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/favorite-remove/${id}/`, {
      headers: this.getHeaders()
    });
  }
}