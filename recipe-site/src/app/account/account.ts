import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-account',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterLinkActive /*AppRoutingModule*/], 
  templateUrl: './account.html',
  styleUrls: ['./account.css']
})
export class AccountComponent implements OnInit {
  selectedMenu: string = 'personal';

  // Ескі 'user' объектісінің орнына Personal бетіндегідей 'userFields' қолданамыз
  userFields = {
    username: '',
    avatar: null
  };

  // Рецепттер айнымалылары қала береді
  showAllFavorites: boolean = false;
  showAllMyRecipes: boolean = false;
  favorites: any[] = [];
  myRecipes: any[] = [];

  ngOnInit() {
    // Бет ашылғанда LocalStorage-дан деректерді оқимыз
    const data = localStorage.getItem('userProfile');
    if (data) {
      this.userFields = JSON.parse(data);
    }
  }
  
}

