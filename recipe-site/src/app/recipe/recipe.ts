import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ApiService } from '../services/recipe';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css'
})
export class RecipeComponent implements OnInit {
  recipe: any = null;
  serves: number = 1;
  selectedIngredients: Set<number> = new Set();
  loading: boolean = true;
  categorySlug: string = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef
  ) { }

  categoryIdFromQuery: string = '';

  ngOnInit() {
    this.route.params.pipe(
      switchMap(params => {
        const idParam = params['id'];
        const productId = Number(idParam);

        if (!idParam || isNaN(productId)) {
          console.error('Invalid product id:', idParam);
          this.loading = false;
          this.cdr.detectChanges();
          return of(null);
        }

        this.loading = true;
        this.recipe = null;

        return this.apiService.getProduct(productId).pipe(
          switchMap(product => {
            console.log('PRODUCT:', product);

            if (!product?.recipe) {
              console.error('This product has no linked recipe');
              this.loading = false;
              this.cdr.detectChanges();
              return of(null);
            }

            return this.apiService.getRecipe(product.recipe).pipe(
              switchMap(recipeData => {
                console.log('RECIPE DATA:', recipeData);

                let ingredients: any[] = [];
                let instructions: any[] = [];

                if (Array.isArray(recipeData.ingredients)) {
                  ingredients = recipeData.ingredients;
                } else if (typeof recipeData.ingredients === 'string') {
                  try {
                    const parsed = JSON.parse(recipeData.ingredients);
                    ingredients = Array.isArray(parsed) ? parsed : [];
                  } catch {
                    ingredients = recipeData.ingredients
                      .split(',')
                      .map((item: string) => item.trim())
                      .filter((item: string) => item.length > 0)
                      .map((item: string) => ({
                        name: item,
                        amount: 0,
                        unit: ''
                      }));
                  }
                }

                if (typeof recipeData.instructions === 'string') {
                  instructions = recipeData.instructions
                    .split(/\n(?=\d+\.)|\n\s*\n/)
                    .map((step: string) => step.trim())
                    .filter((step: string) => step.length > 0)
                    .map((step: string) => ({ description: step }));
                } else if (Array.isArray(recipeData.instructions)) {
                  instructions = recipeData.instructions;
                }

                const normalizedRecipe = {
                  ...recipeData,
                  name: recipeData.title || 'No name',
                  categoryName: product.categoryName || product.category_name || '',
                  time: recipeData.prep_time || product.time || 'No time',
                  ingredients,
                  instructions
                };

                return of(normalizedRecipe);
              })
            );
          })
        );
      })
    ).subscribe({
      next: (normalizedRecipe) => {
        if (!normalizedRecipe) {
          this.loading = false;
          this.cdr.detectChanges();
          return;
        }

        this.recipe = normalizedRecipe;

        const fromCategory = this.route.snapshot.queryParamMap.get('fromCategory');

        const fromCategoryId = this.route.snapshot.queryParamMap.get('fromCategoryId');
        this.categoryIdFromQuery = fromCategoryId || '';

        console.log('categorySlug:', this.categorySlug);

        this.loading = false;
        this.cdr.detectChanges();

        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });
      },
      error: (err) => {
        console.error('Recipe load error:', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  plus() {
    this.serves++;
  }

  minus() {
    if (this.serves > 1) {
      this.serves--;
    }
  }

  toggleIngredient(index: number) {
    if (this.selectedIngredients.has(index)) {
      this.selectedIngredients.delete(index);
    } else {
      this.selectedIngredients.add(index);
    }
  }

  isSelected(index: number): boolean {
    return this.selectedIngredients.has(index);
  }
}