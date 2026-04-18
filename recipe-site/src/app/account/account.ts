import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../logout/logout';
import { ApiService } from '../services/recipe';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterLinkActive, LogoutComponent],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent implements OnInit {
  isLogoutOpen: boolean = false;

  userFields: any = {
    username: 'Chef',
    firstName: '',
    avatar: null
  };

  showAllFavorites: boolean = false;
  showAllMyRecipes: boolean = false;
  favorites: any[] = [];
  myRecipes: any[] = [];

  constructor(
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    const data = localStorage.getItem('userProfile');
    if (data) {
      try {
        const parsedData = JSON.parse(data);
        this.userFields.firstName = parsedData.firstName || '';
        this.userFields.username = parsedData.username || 'Chef';
        this.userFields.avatar = parsedData.avatar || null;
      } catch (e) {
        console.error("Error parsing local profile data", e);
      }
    }

    this.loadUserData();
  }

  loadUserData() {
    this.apiService.getUserProfile().subscribe({
      next: (data: any) => {
        this.userFields.username = data.username;

        if (data.profile && data.profile.user_name) {
          this.userFields.username = data.profile.user_name; 
          this.userFields.firstName = data.profile.user_name;
        }

        this.favorites = data.favorites || [];
        this.myRecipes = data.my_recipes || [];
        this.cdr.detectChanges();
      },
      error: (err: any) => console.error('Error:', err)
    });
  }
}