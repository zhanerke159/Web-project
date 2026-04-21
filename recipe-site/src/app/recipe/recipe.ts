import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../services/recipe'
import { Location } from '@angular/common';;

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './recipe.html',
  styleUrl: './recipe.css'
})
export class RecipeComponent implements OnInit {
  recipe: any = null;
  serves: number = 1;
  selectedIngredients: Set<number> = new Set();
  loading: boolean = true;
  categorySlug: string = '';
  categoryIdFromQuery: string = '';

  reviews: any[] = [];
  averageRating: number = 0;
  showReviewForm: boolean = false;

  newReview = {
    rating: 5,
    comment: ''
  };

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private cdr: ChangeDetectorRef,
    private location: Location
  ) { }

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
            if (!product?.recipe) {
              console.error('This product has no linked recipe');
              this.loading = false;
              this.cdr.detectChanges();
              return of(null);
            }

            return this.apiService.getRecipe(product.recipe).pipe(
              switchMap(recipeData => {
                return this.apiService.getCategories().pipe(
                  switchMap(categories => {
                    let ingredients: any[] = [];
                    let instructions: any[] = [];

                    if (Array.isArray(recipeData.ingredients)) {
                      ingredients = recipeData.ingredients;
                    } else if (typeof recipeData.ingredients === 'string') {
                      try {
                        const parsed = JSON.parse(recipeData.ingredients);

                        if (Array.isArray(parsed)) {
                          ingredients = parsed;
                        } else {
                          ingredients = recipeData.ingredients
                            .split('\n')
                            .map((line: string) => line.trim())
                            .filter((line: string) => line.length > 0)
                            .map((line: string) => ({
                              name: line,
                              amount: 0,
                              unit: ''
                            }));
                        }
                      } catch {
                        ingredients = recipeData.ingredients
                          .split('\n')
                          .map((line: string) => line.trim())
                          .filter((line: string) => line.length > 0)
                          .map((line: string) => ({
                            name: line,
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

                    const foundCategory = categories.find((cat: any) => cat.id === product.category);

                    const normalizedRecipe = {
                      ...recipeData,
                      name: recipeData.title || 'No name',
                      categoryName: foundCategory ? foundCategory.name : 'No category',
                      time: recipeData.prep_time || product.time || 'No time',
                      ingredients,
                      instructions,
                      productId: product.id
                    };

                    return of(normalizedRecipe);
                  })
                );
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

        const fromCategoryId = this.route.snapshot.queryParamMap.get('fromCategoryId');
        this.categoryIdFromQuery = fromCategoryId || '';

        this.categorySlug = (this.recipe.categoryName || '')
          .toLowerCase()
          .replaceAll(' ', '-');

        this.loadReviews();

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

  loadReviews() {
    this.apiService.getReviews().subscribe({
      next: (data: any[]) => {
        this.reviews = data.filter(review => review.recipe === this.recipe.id);

        if (this.reviews.length > 0) {
          const total = this.reviews.reduce((sum, review) => sum + review.rating, 0);
          this.averageRating = +(total / this.reviews.length).toFixed(1);
        } else {
          this.averageRating = 0;
        }

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error loading reviews:', err);
      }
    });
  }

  submitReview() {
    if (!this.recipe?.id) return;

    const reviewPayload = {
      recipe: this.recipe.id,
      rating: this.newReview.rating,
      comment: this.newReview.comment
    };

    this.apiService.createReview(reviewPayload).subscribe({
      next: () => {
        this.newReview = {
          rating: 5,
          comment: ''
        };
        this.showReviewForm = false;
        this.loadReviews();
      },
      error: (err) => {
        console.error('Error creating review:', err);
      }
    });
  }

  plus() {
    this.serves++;
  }

  minus() {
    if (this.serves > 1) this.serves--;
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

  goBack() {
  this.location.back();
}
}