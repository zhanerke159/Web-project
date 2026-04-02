import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router'; // Добавь этот импорт

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet], // Убедись, что RouterOutlet здесь прописан
  templateUrl: './app.component.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'recipe-site';
}