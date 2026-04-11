import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class LogoutComponent {
  @Output() close = new EventEmitter<void>();

  confirmLogout() {
    localStorage.clear();
    window.location.href = '/register';
  }

  cancel() {
    this.close.emit(); // Жабу оқиғасын жіберу
  }
}