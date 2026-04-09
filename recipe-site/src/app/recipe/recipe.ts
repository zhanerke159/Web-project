import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-recipe',
  standalone: true, 
  imports: [CommonModule], 
  templateUrl: './recipe.html',
  styleUrls: ['./recipe.css']
})
export class RecipeComponent {
  recipes = [
    {
      id: 1,
      title: 'Lagman',
      time: '1.15 minutes',
      description: 'A flavorful dish with hand-pulled noodles, tender beef, and veggies.',
      image: 'assets/lagman.jpg'
    },
    {
      id: 2,
      title: 'Soup',
      time: '50 minutes',
      description: 'A comforting and flavorful dish made with vegetables to meats, simmered in a rich broth',
      image: 'assets/soup.jpg'
    }
  ];

  constructor(private router: Router) {}

  seeIngredients(id: number): void {
    this.router.navigate(['/ingredients', id]);
  }

  addToFavorites(id: number): void {
    console.log('Added to favorites:', id);
  }
}