import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Header } from '../header/header';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule, Header],
  templateUrl: './home.html',
  styleUrl: './home.css',
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy {
  searchQuery: string = '';
  currentSlideIndex = 0;
  private slideInterval: any;

  categories = [
    { id: 1, name: 'Fast Food', image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg' },
    { id: 2, name: 'Desserts', image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg' },
    { id: 3, name: 'Drinks', image: 'https://i.pinimg.com/736x/d2/88/28/d28828f724f103296937917acd48988e.jpg' },
    { id: 4, name: 'Salads', image: 'https://i.pinimg.com/736x/a0/e1/86/a0e186e9f46b4de9cbed7ee4f172abd8.jpg' },
    { id: 5, name: 'Main dishes', image: 'https://i.pinimg.com/736x/2e/ef/c2/2eefc20ea967eb58909a1864beebed27.jpg' },
    { id: 6, name: 'Chinese cuisine', image: 'https://i.pinimg.com/736x/09/08/b7/0908b72c952b9a1c6399a1a29bafe36f.jpg' }
  ];
  slides = [
    'https://t3.ftcdn.net/jpg/07/09/78/76/360_F_709787664_mkpcdGMyquDqROLcXev1buwXmzor2XDK.jpg',
    'https://i.pinimg.com/1200x/89/7f/f0/897ff0ef441e38e9192d4d0e93f1cebc.jpg',
    'https://i.pinimg.com/1200x/25/ed/36/25ed36330a13dadb1a698bd7e4a37612.jpg',
    'https://i.pinimg.com/1200x/61/2a/8f/612a8ff49ee0d75ee1b72a34278c98a2.jpg'
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
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.currentSlideIndex++;
    } else {
      this.stopAutoSlide();
    }

  }

  prevSlide(): void {
    if (this.currentSlideIndex > 0) {
      this.currentSlideIndex--;
      this.resetAutoSlide();
    }
  }
  stopAutoSlide(): void {
    if (this.slideInterval) {
      clearInterval(this.slideInterval);
    }
  }
  goToSlide(index: number): void {
    this.currentSlideIndex = index;
    this.resetAutoSlide();
  }

  ngOnDestroy(): void {
    clearInterval(this.slideInterval);
  }

  nextSlideManual(): void {
    if (this.currentSlideIndex < this.slides.length - 1) {
      this.nextSlide();
      this.resetAutoSlide();
    }
  }



}