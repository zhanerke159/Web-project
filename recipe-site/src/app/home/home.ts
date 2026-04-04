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
    { name: 'Fast Food', image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg' },
    { name: 'Desserts', image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg' },
    { name: 'Drinks', image: 'https://i.pinimg.com/736x/d2/88/28/d28828f724f103296937917acd48988e.jpg' },
    { name: 'Salads', image: 'https://i.pinimg.com/736x/a0/e1/86/a0e186e9f46b4de9cbed7ee4f172abd8.jpg' },
    { name: 'Main dishes', image: 'https://i.pinimg.com/736x/2e/ef/c2/2eefc20ea967eb58909a1864beebed27.jpg' },
    { name: ' Chinese cuisine', image: 'https://i.pinimg.com/736x/09/08/b7/0908b72c952b9a1c6399a1a29bafe36f.jpg' }
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