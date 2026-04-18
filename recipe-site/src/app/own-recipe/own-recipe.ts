import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/recipe'
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
    categoryId: 1,
    prepTime: '',
    photos: [] as any[],
    steps: ['']
  };

  selectedFileName: string = '';

  constructor(private cdr: ChangeDetectorRef,
    private zone: NgZone,
    private apiService: ApiService,
    private router: Router) { }
  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      Array.from(files).forEach(file => {
        if (file.type.match(/image.*/)) {
          const reader = new FileReader();

          reader.onload = (e: any) => {
            this.zone.run(() => {
              this.recipe.photos.push(e.target.result);
              this.cdr.detectChanges();
            });
          };

          reader.readAsDataURL(file);
        }
      });
    }

    event.target.value = '';
  }

  goHome() {
    this.router.navigate(['/']);
  }
  removePhoto(index: number): void {
    this.recipe.photos.splice(index, 1);

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
    const newRecipe: OwnRecipe = {
      title: this.recipe.name,
      image: this.recipe.photos.length > 0 ? this.recipe.photos[0] : '',
      description: this.recipe.description,
      category: Number(this.recipe.categoryId),
      ingredients: this.recipe.ingredients,
      prep_time: Number(this.recipe.prepTime) || 15,
      instructions: this.recipe.steps.join('\n'),

    };

    this.apiService.createRecipe(newRecipe).subscribe({
      next: (res) => {
        console.log('Receipt created successfully');
        this.router.navigate(['/account']);
      },
      error: (err) => {
        console.error('Check fields or terminal:', err);
      }
    });
  }

  trackByFn(index: number, item: any) {
    return index;
  }
}