import { Component } from '@angular/core';
import { Header } from '../header/header';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-category',
  standalone: true,
  imports: [Header, CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.css',
})
export class CategoryComponent {}
