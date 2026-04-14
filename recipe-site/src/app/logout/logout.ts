import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.html',
  styleUrls: ['./logout.css']
})
export class LogoutComponent {
  @Output() close = new EventEmitter<void>();
  constructor(private router: Router) { }
  confirmLogout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
  cancel() {
    this.close.emit();
  }
}