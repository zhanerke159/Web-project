import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css'
})
export class RecipeComponent implements OnInit {
  categoryTitle: string = '';
  recipes: any[] = [];

  allData: any = {
    'fast-food': [
      { 
        id: 3, 
        name: 'Burger', 
        time: '15 minutes',
        image: 'assets/burger.jpg', 
        description: 'Juicy beef burger with fresh vegetables.' 
      }
    ],
    // ... остальные категории
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const categoryId = params['category']; 
      if (categoryId) {
        this.categoryTitle = categoryId.replace('-', ' '); 
        this.recipes = this.allData[categoryId] || [];
      }
    });
  }
  addToFavorites(recipeId: number) {
    console.log('Added to favorites:', recipeId);
    // Здесь будет логика добавления в избранное
  }

  seeIngredients(recipeId: number) {
    console.log('Opening ingredients for:', recipeId);
    // Здесь будет логика перехода к ингредиентам
  }
}