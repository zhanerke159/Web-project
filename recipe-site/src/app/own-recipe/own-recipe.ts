import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
    ingredients: '',
    photos: [] as File[],
    steps: ['']
  };

  selectedFileName: string = '';

  constructor(private cdr: ChangeDetectorRef, private zone: NgZone) { }
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
}