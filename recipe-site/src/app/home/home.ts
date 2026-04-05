import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  currentSlideIndex = 0;
  private slideInterval: any;

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

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.slideInterval = setInterval(() => {
      this.nextSlide();
    }, 3000);
  }

  resetAutoSlide(): void {
    clearInterval(this.slideInterval);
    this.startAutoSlide();
  }

  nextSlide(): void {
    this.currentSlideIndex = (this.currentSlideIndex + 1) % this.slides.length;
  }

  prevSlide(): void {
    this.currentSlideIndex =
      (this.currentSlideIndex - 1 + this.slides.length) % this.slides.length;
    this.resetAutoSlide();
  }
  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.resetAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  nextSlideManual(): void {
    this.nextSlide();
    this.resetAutoSlide();
  }


}