import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http'; // Добавили импорты
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://127.0.0.1:8000/api'; // Базовый URL для удобства

  constructor(private http: HttpClient) { }

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register/`, userData);
  }

  login(credentials: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/token/`, credentials);
  }

  searchRecipes(query: any): Observable<any> {
    let params = new HttpParams();
    if (query.title) {
      params = params.append('title', query.title);
    }


    return this.http.get(`${this.baseUrl}/recipes/search/`, { params });
  }
}