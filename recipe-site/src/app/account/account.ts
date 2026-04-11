import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
//import { AppRoutingModule } from "../app-routing.module";

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule, FormsModule /*AppRoutingModule*/ ],
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent {
  selectedMenu: string = 'personal';
  // Пайдаланушы мәліметтері
  user = {
    name: 'Cristiano Ronaldo',
    avatar: null, // Немесе өз суретіңнің жолы
    status: 'Ready to cook something delicious today?'
  };

  // Рецепттер тізімі (Favorites бөлімі үшін)
  showAllFavorites: boolean = false;
  showAllMyRecipes: boolean = false;
  favorites: any[] = [];
  myRecipes: any[]=[];
  
}

