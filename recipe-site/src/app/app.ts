import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, Router } from '@angular/router';
import { ApiService } from './services/recipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink,  CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'recipe-site';

  scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
  }

  searchResults: any[] = [];
  searchQuery: string = '';

 constructor(
    private apiService: ApiService, 
    private router: Router
  ) {}

  onSearch() {
    if (!this.searchQuery || this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }
    const queryObj = { title: this.searchQuery };

    this.apiService.searchRecipes(queryObj).subscribe({
      next: (data: any) => {
        this.searchResults = data;
      },
      error: (err) => {
        console.error('Ошибка при поиске:', err);
      }
    });
  }

  goToRecipe(id: number) {
    this.router.navigate(['/recipe', id]);
    this.searchQuery = ''; 
    this.searchResults = [];
  }
} 