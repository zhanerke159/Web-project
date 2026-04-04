import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe',
  imports: [],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css',
})
export class RecipeComponent implements OnInit {
  categoryName: string | null = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.categoryName = this.route.snapshot.paramMap.get('name');
  }
}
