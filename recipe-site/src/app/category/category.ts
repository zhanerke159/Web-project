import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Products } from '../models/products';
import { Category } from '../models/category';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './category.html',
  styleUrl: './category.css'
})
export class CategoryComponent implements OnInit {
  categoryName: string = '';
  filteredProducts: Products[] = []; 
  allProducts: Products[] = [
    { 
      id: 1, 
      name: 'Double Cheeseburger', 
      description: 'Classic burger with double cheese', 
      category: 1, // ID для Fast Food
      image: 'https://i.pinimg.com/736x/72/6a/57/726a57da3fb47a280dc1131790848fc9.jpg' 
    },
    { 
      id: 2, 
      name: 'Chocolate Cake', 
      description: 'Sweet chocolate dessert', 
      category: 2, // ID для Desserts
      image: 'https://i.pinimg.com/736x/4b/b9/8b/4bb98b8eb28c027087aad8b164ae3b03.jpg' 
    },
    { 
      id: 3, 
      name: 'Pepperoni Pizza', 
      description: 'Hot and spicy pizza', 
      category: 1, 
      image: 'https://i.pinimg.com/736x/37/b6/60/37b660cb40988dda83c8d345f62c83da.jpg' 
    }
  ];

  // 2. Список категорий для сопоставления ID и Названия
  categories: Category[] = [
    { id: 1, name: 'Fast Food', description: 'Quick and tasty' },
    { id: 2, name: 'Desserts', description: 'Sweet treats' },
    { id: 3, name: 'Drinks', description: 'Refreshing beverages' },
    { id: 4, name: 'Salads', description: 'Healthy greens' },
    { id: 5, name: 'Main dishes', description: 'Satisfying meals' },
    { id: 6, name: 'Chinese cuisine', description: 'Authentic flavors' }
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const nameFromUrl = params['name']; // Например, "Fast Food"
      const foundCategory = this.categories.find(
        c => c.name.toLowerCase() === nameFromUrl.toLowerCase()
      );

      if (foundCategory) {
        this.categoryName = foundCategory.name;
        
        this.filteredProducts = this.allProducts.filter(
          p => p.category === foundCategory.id
        );
      } else {
        this.categoryName = 'Category Not Found';
        this.filteredProducts = [];
      }
    });
  }
}