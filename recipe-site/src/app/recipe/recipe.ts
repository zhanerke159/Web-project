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
  categoryTitle: string = 'Fast food';
  recipes: any[] = [];

  allData: any = {
    'main-dishes': [
      { id: 1, name: 'Lagman', time: '1.15 minutes', image: 'assets/lagman.jpg', description: 'A flavorful dish with hand-pulled noodles, tender beef, and veggies.' },
      { id: 2, name: 'Soup', time: '50 minutes', image: 'assets/soup.jpg', description: 'A comforting and flavorful dish made with vegetables and meats.' }
    ],
    'fast-food': [
      { id: 3, name: 'Burger', time: '15 minutes', image: 'assets/burger.jpg', description: 'Juicy beef burger with fresh vegetables.' },
      { id: 4, name: 'Pizza', time: '20 minutes', image: 'assets/pizza.jpg', description: 'Classic pepperoni pizza with mozzarella.' }
    ],
    'drinks': [
      { id: 5, name: 'Smoothie', time: '5 minutes', image: 'assets/smoothie.jpg', description: 'Fresh fruit and vegetable mix.' },
      { id: 6, name: 'Iced Coffee', time: '10 minutes', image: 'assets/coffee.jpg', description: 'Cold brewed coffee with milk and ice.' }
    ],
    'salads': [
      { id: 7, name: 'Greek Salad', time: '15 minutes', image: 'assets/greek-salad.jpg', description: 'Fresh tomatoes, cucumbers, and feta cheese.' },
      { id: 8, name: 'Caesar', time: '20 minutes', image: 'assets/caesar.jpg', description: 'Romaine lettuce with parmesan and croutons.' }
    ],
    'desserts': [
      { id: 9, name: 'Chocolate Cake', time: '45 minutes', image: 'assets/cake.jpg', description: 'Rich chocolate layers with cream.' }
    ],
    'soup': [
      { id: 10, name: 'Tomato Soup', time: '30 minutes', image: 'assets/tomato-soup.jpg', description: 'Creamy soup made from roasted tomatoes.' }
    ]
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      // Angular берет 'category' из URL (например, /recipe/drinks)
      const categoryId = params['category']; 
      
      if (categoryId) {
        // Здесь 'categoryId' (drinks) превращается в заголовок страницы
        this.categoryTitle = categoryId.replace('-', ' '); 
        
        // Здесь из allData выбираются только те блюда, которые относятся к 'drinks'
        this.recipes = this.allData[categoryId] || [];
      }
    });
  }

  addToFavorites(recipeId: number) {
    console.log('Added to favorites:', recipeId);
  }

  seeIngredients(recipeId: number) {
    console.log('Opening ingredients for:', recipeId);
  }
}