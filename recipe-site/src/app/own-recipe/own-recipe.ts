import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


interface Recipe {
  name: string;
  ingredients: string;
  photos: File[];
  steps: string[];
}

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './own-recipe.html',
  styleUrls: ['./own-recipe.css']
})
export class OwnRecipeComponent {
  recipe: Recipe = {
    name: '',
    ingredients: '',
    photos: [],
    steps: ['']
  };

  selectedFileName: string = '';

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.recipe.photos = Array.from(files);
      this.selectedFileName = `Selected ${files.length} photos`;
      console.log('Files ready for upload:', this.recipe.photos);
    }
  }
}