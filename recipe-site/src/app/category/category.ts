import { Component, OnInit } from '@angular/core';
import { Header } from '../header/header';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../models/products';
import { Category } from '../models/category';
import { ApiService } from '../services/recipe';
import { ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [Header, CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  filteredProducts: Products[] = [];
  recipes: any[] = [];

  categories: Category[] = [
    { id: 1, name: 'fast-food' },
    { id: 2, name: 'desserts' },
    { id: 3, name: 'drinks' },
    { id: 4, name: 'Salads' },
    { id: 5, name: 'main dishes' },
    { id: 6, name: 'Chinese cuisine' }
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  seeIngredients(id: number) {
    console.log('Посмотреть ингредиенты для ID:', id);
  }

  favoriteIds: number[] = [];
  toggleFavorite(recipe: any) {
    const recipeId = Number(recipe.id);
    const isFav = this.isFavorite(recipe);
    const token = localStorage.getItem('user_token');

    if (!token) {
      this.router.navigate(['/register']);
      return;
    }
    if (isFav) {
      this.apiService.removeFromFavorites(recipeId).subscribe({
        next: () => {
          console.log('Deleted from server');
          this.loadFavorites();
        },
        error: (err: any) => console.error('Error deleting', err)
      });
    } else {
      this.apiService.addToFavorites(recipeId).subscribe({
        next: () => {
          console.log('Saved to server');
          this.loadFavorites();
        },
        error: (err: any) => console.error('Error saving', err)
      });
    }
  }
  loadFavorites(): void {
    this.apiService.getFavorites().subscribe({
      next: (data) => {
        console.log('favorites data:', data);

        const favorites = data.favorites || [];

        this.favoriteIds = favorites
          .map((fav: any) => Number(fav.id))
          .filter((id: number) => !isNaN(id));

        console.log('favoriteIds:', this.favoriteIds);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error('Cannot load favorites', err);
        this.favoriteIds = [];
        this.cdr.detectChanges();
      }
    });
  }

  isFavorite(recipe: any): boolean {
    return this.favoriteIds.includes(Number(recipe.id));
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nameFromUrl = params['name']?.toLowerCase().trim();
      console.log('Имя из URL:', nameFromUrl);

      const foundCategory = this.categories.find(c =>
        c.name.toLowerCase().replace(/\s/g, '-') === nameFromUrl?.replace(/\s/g, '-')
      );

      this.loadFavorites();

      if (foundCategory) {
        this.categoryName = foundCategory.name;

        this.apiService.getProductsByCategory(foundCategory.id).subscribe({
          next: (data) => {
            this.filteredProducts = data;
            this.cdr.detectChanges();
            console.log('filteredProducts:', this.filteredProducts);
            console.log('Найдено продуктов:', this.filteredProducts.length);
          },
          error: (err) => console.error('CATEGORY ERROR:', err)
        });

      } else {
        this.categoryName = 'Category Not Found';
        this.filteredProducts = [];
        console.warn('Категория не найдена в списке для:', nameFromUrl);
      }
    });
  }
}