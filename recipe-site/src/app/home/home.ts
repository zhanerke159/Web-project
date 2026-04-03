import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-home',
  standalone: true, 
  imports: [FormsModule, CommonModule], 
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  currentSlideIndex = 0;
  private slideTimer: any;

  categories = [
    { name: 'Fast Food', icon: '🍔', color: '#FDE68A' },
    { name: 'Desserts', icon: '🍰', color: '#E0E7FF' },
    { name: 'Drinks', icon: '🍹', color: '#FEF3C7' },
    { name: 'Healthy', icon: '🥗', color: '#D1FAE5' },
    { name: 'Breakfast', icon: '🍳', color: '#DBEAFE' },
    { name: 'Main Dishes', icon: '🍝', color: '#F3E8FF' }
  ];

  slides = [
    'https://i.pinimg.com/1200x/86/2b/a7/862ba759d5444daddbf03bd07e94eb4d.jpg',
    'https://i.pinimg.com/1200x/e3/0e/56/e30e5616b2b6abc44dff773d15539614.jpg',
    'https://i.pinimg.com/1200x/ba/b3/18/bab31873cf89cde0aae2635159ca508a.jpg'
  ];

  ngOnInit() {
    this.startCarousel();
  }

  startCarousel() {
    this.slideTimer = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  nextSlide() {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  onSearch() {
    console.log('Searching for:', this.searchQuery);
  }

  ngOnDestroy() {
    if (this.slideTimer) {
      clearInterval(this.slideTimer);
    }
  }
}