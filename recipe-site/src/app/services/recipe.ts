import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
import { Recipe } from '../models/recipe';
import { Review } from '../models/review';
import { UserProfile } from '../models/userProf';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('user_token');
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(`${this.baseUrl}/recipes/`);
  }

  getRecipe(id: number): Observable<Recipe> {
    return this.http.get<Recipe>(`${this.baseUrl}/recipes/${id}/`);
  }

  updateRecipe(id: number, recipeData: Partial<Recipe>): Observable<Recipe> {
    return this.http.put<Recipe>(`${this.baseUrl}/recipes-update/${id}/`, recipeData);
  }

  searchRecipes(title: string) {
    return this.http.get(`http://127.0.0.1:8000/api/recipes/search/?title=${title}`);
  }
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${this.baseUrl}/categories/`);
  }

  getReviews(): Observable<Review[]> {
    return this.http.get<Review[]>(`${this.baseUrl}/reviews/`);
  }

  createReview(review: Review): Observable<Review> {
    return this.http.post<Review>(`${this.baseUrl}/reviews/`, review);
  }

  createRecipe(recipeData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/recipes/`, recipeData, { headers: this.getHeaders() });
  }

  addToFavorites(recipeId: number): Observable<any> {
    const token = localStorage.getItem('user_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

    return this.http.post(`${this.baseUrl}/favorite/${recipeId}/`, {}, { headers });
  }
  getUserProfile(): Observable<any> {
    return this.http.get(`${this.baseUrl}/user/me/`, { headers: this.getHeaders() });
  }

  getRecipesByCategory(categoryId: number): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/api/recipes/?category=${categoryId}`);
  }


  updateUserProfile(userData: any): Observable<any> {
    const token = localStorage.getItem('user_token');
    const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });
    return this.http.patch(`http://127.0.0.1:8000/api/user/me/`, userData, { headers });
  }

  change_password(passwordData: any) {
    const token = localStorage.getItem('user_token')
    return this.http.post('http://127.0.0.1:8000/api/user/change-password/', passwordData, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }
}