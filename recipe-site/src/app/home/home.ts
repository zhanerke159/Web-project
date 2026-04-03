import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Добавь этот импорт
import { CommonModule } from '@angular/common'; // Добавь этот импорт для @for и @if

@Component({
  selector: 'app-home',
  standalone: true, // Проверь, стоит ли тут true
  imports: [FormsModule, CommonModule], // ОБЯЗАТЕЛЬНО добавь это сюда
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent {
  searchQuery: string = '';

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  // Тот самый массив для категорий, который мы обсуждали
  categories = [
    { name: 'Fast Food', icon: '🍔', color: '#FDE68A' },
    { name: 'Desserts', icon: '🍰', color: '#E0E7FF' },
    { name: 'Drinks', icon: '🍹', color: '#FEF3C7' },
    { name: 'Healthy', icon: '🥗', color: '#D1FAE5' },
    { name: 'Breakfast', icon: '🍳', color: '#DBEAFE' },
    { name: 'Main Dishes', icon: '🍝', color: '#F3E8FF' }
  ];
}