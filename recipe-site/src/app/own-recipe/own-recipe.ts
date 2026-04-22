import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/recipe';
import { OwnRecipe } from '../models/own-recipe';

@Component({
  selector: 'app-own-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './own-recipe.html',
  styleUrls: ['./own-recipe.css']
})
export class OwnRecipeComponent {
  recipe = {
    name: '',
    description: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    categoryId: '',
    prepTime: '',
    photos: [] as string[],
    steps: ['']
  };

  addIngredient() {
   this.recipe.ingredients.push({ name: '', amount: '', unit: '' });
  }

  removeIngredient(index: number) {
    if (this.recipe.ingredients.length > 1) {
      this.recipe.ingredients.splice(index, 1);
    }
  }

  selectedFileName: string = '';

  constructor(
    private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private apiService: ApiService,
    private router: Router
  ) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const files = input.files;

    if (!files || files.length === 0) {
      return;
    }

    Array.from(files).forEach((file) => {
      if (!file.type.match(/image.*/)) {
        return;
      }

      const reader = new FileReader();

      reader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result;
        if (typeof result === 'string') {
          this.zone.run(() => {
            this.recipe.photos.push(result);
            this.cdr.detectChanges();
          });
        }
      };

      reader.readAsDataURL(file);
    });

    input.value = '';
  }

  goHome() {
    this.router.navigate(['/']);
  }

  removePhoto(index: number): void {
    this.recipe.photos.splice(index, 1);
    this.cdr.detectChanges();
  }

  addStep() {
    this.recipe.steps.push('');
  }

  removeStep(index: number) {
    if (this.recipe.steps.length > 1) {
      this.recipe.steps.splice(index, 1);
    }
  }

  saveRecipe() {
  const cleanedSteps = this.recipe.steps
    .map(step => step.trim())
    .filter(step => step.length > 0);

  const cleanedIngredients = this.recipe.ingredients
    .filter(ing => ing.name.trim().length > 0)
    .map(ing => ({
      name: ing.name.trim(),
      amount: Number(ing.amount) || 0,
      unit: ing.unit.trim()
    }));

  const newRecipe: OwnRecipe = {
    title: this.recipe.name.trim(),
    image: this.recipe.photos.length > 0 ? this.recipe.photos[0] : '',
    description: this.recipe.description.trim(),
    category: Number(this.recipe.categoryId),
    ingredients: JSON.stringify(cleanedIngredients),
    prep_time: Number(this.recipe.prepTime) || 15,
    instructions: cleanedSteps.join('\n')
  };

  console.log('SENDING:', newRecipe);

  this.apiService.createRecipe(newRecipe).subscribe({
    next: () => {
      console.log('Recipe created successfully');
      this.router.navigate(['/account']);
    },
    error: (err) => {
      console.error('Check fields or terminal:', err);
      console.error('Backend error body:', err.error);
    }
  });
}
  trackByIndex(index: number): number {
    return index;
  }
}