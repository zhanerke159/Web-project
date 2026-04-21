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
    ingredients: '',
    categoryId: '',
    prepTime: '',
    photos: [] as string[],
    steps: ['']
  };

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
      .split('\n')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        const parts = line.split(':');
        const name = parts[0]?.trim() || '';

        if (!name) {
          return null;
        }

        const valuePart = parts[1]?.trim() || '';
        const valueTokens = valuePart.split(' ').filter(token => token.length > 0);

        let amount = 0;
        let unit = '';

        if (valueTokens.length > 0) {
          const parsedAmount = Number(valueTokens[0]);
          amount = isNaN(parsedAmount) ? 0 : parsedAmount;
          unit = valueTokens.slice(1).join(' ');
        }

        return {
          name,
          amount,
          unit
        };
      })
      .filter(item => item !== null);

    const newRecipe: OwnRecipe = {
      title: this.recipe.name.trim(),
      image: this.recipe.photos.length > 0 ? this.recipe.photos[0] : '',
      description: this.recipe.description.trim(),
      category: Number(this.recipe.categoryId),

      // сохраняем как JSON-строку, чтобы потом recipe.ts мог сделать JSON.parse()
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
}