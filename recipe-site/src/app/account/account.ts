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
  onFileSelected(event: any) {
    const file: File = event.target.files[0]; // Таңдалған файлды аламыз

    if (file) {
      // Файлдың сурет екенін қосымша тексереміз
      if (!file.type.startsWith('image/')) {
        alert('Өтініш, тек сурет файлын таңдаңыз!');
        return;
      }

      const reader = new FileReader();

      // Файл оқылып болғанда жұмыс істейді
      reader.onload = (e: any) => {
        // Суреттің Base64 форматын userFields.avatar-ға жазамыз
        this.userFields.avatar = e.target.result;
        console.log('Жаңа аватар жүктелді');
      };

      // Файлды Base64 форматында оқуды бастаймыз
      reader.readAsDataURL(file);
    }
  }
  deletePhoto() {
  // 1. Компоненттегі мәнді тазалау
  this.userFields.avatar = null;

  // 2. LocalStorage-дағы деректі жаңарту
  const data = localStorage.getItem('userProfile');
  if (data) {
    const profile = JSON.parse(data);
    profile.avatar = null;
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }
  
  console.log('Аватар өшірілді және дефолт мән қайтарылды');
}
}

