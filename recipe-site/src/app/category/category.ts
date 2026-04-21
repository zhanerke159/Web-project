import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/recipe';
import { Header } from '../header/header';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterLink, Header],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  categoryId: number = 0;

  products: any[] = [];
  filteredProducts: any[] = [];
  favorites: any[] = [];
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const idParam = params['id'];
      const id = Number(idParam);

      if (!idParam || isNaN(id)) {
        console.error('Invalid category id:', idParam);
        this.isLoading = false;
        return;
      }

      this.categoryId = id;
      this.isLoading = true;
      this.products = [];
      this.filteredProducts = [];

      this.loadCategoryData(id);
    });
  }

  loadCategoryData(categoryId: number) {
    this.apiService.getCategories().subscribe({
      next: (categories) => {
        const foundCategory = categories.find((cat: any) => cat.id === categoryId);

        if (!foundCategory) {
          console.error('Category not found for id:', categoryId);
          this.categoryName = 'Unknown category';
          this.isLoading = false;
          this.cdr.detectChanges();
          return;
        }

        this.categoryName = foundCategory.name;

        this.apiService.getProductsByCategory(categoryId).subscribe({
          next: (data) => {
            this.products = data;
            this.filteredProducts = data;
            this.isLoading = false;
            this.loadFavorites();
            this.cdr.detectChanges();
          },
          error: (err) => {
            console.error('Products load error:', err);
            this.filteredProducts = [];
            this.isLoading = false;
            this.cdr.detectChanges();
          }
        });
      },
      error: (err) => {
        console.error('Categories load error:', err);
        this.isLoading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadFavorites() {
    this.apiService.getFavorites().subscribe({
      next: (data) => {
        this.favorites = data?.favorites || [];
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Cannot load favorites', err);
      }
    });
  }

  isFavorite(recipe: any): boolean {
    return this.favorites.some((fav: any) => fav.id === recipe.id);
  }

  toggleFavorite(recipe: any) {
    const token = localStorage.getItem('user_token');

    if (!token) {
      alert('Please login to add recipes to favorites.');
      this.router.navigate(['/register']);
      return;
    }

    if (this.isFavorite(recipe)) {
      this.apiService.removeFromFavorites(recipe.id).subscribe({
        next: () => {
          this.favorites = this.favorites.filter((fav: any) => fav.id !== recipe.id);
        },
        error: (err) => {
          console.error('Remove favorite error:', err);
        }
      });
    } else {
      this.apiService.addToFavorites(recipe.id).subscribe({
        next: () => {
          this.favorites.push(recipe);
        },
        error: (err) => {
          console.error('Add favorite error:', err);
        }
      });
    }
  }

  seeIngredients(recipeId: number) {
    this.router.navigate(['/recipe', recipeId], {
      queryParams: { fromCategoryId: this.categoryId }
    });
  }
}