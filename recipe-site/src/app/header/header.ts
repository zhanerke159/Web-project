import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ApiService } from '../services/recipe';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone:true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  title = 'recipe-site';

  scrollToSection(sectionId: string) {
    if (this.router.url !== '/') {
      this.router.navigate(['/']).then(() => {
        setTimeout(() => {
          const section = document.getElementById(sectionId);
          section?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      });
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  }

  searchResults: any[] = [];
  searchQuery: string = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  onSearch(event: any) {
  const query = event.target.value;
  
  this.apiService.searchRecipes(query).subscribe({
    next: (data: any) => {
      this.searchResults = data.recipes || data; 
      console.log('Данные получены:', this.searchResults);
    },
    error: (err) => console.error(err)
  });
}

  goToRecipe(id: number) {
    this.router.navigate(['/recipe', id]);
    this.searchQuery = '';
    this.searchResults = [];
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('user_token'); 
  }

  logout() {
    localStorage.removeItem('user_token'); 
    this.router.navigate(['/login']);
  }
}
