import { Component } from '@angular/core';
import { AuthService } from '../services/register.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class RegisterComponent {
  // Данные из формы
  userForm = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onCreateAccount() {
    const registerData = {
      username: this.userForm.email, // используем почту как логин
      email: this.userForm.email,
      password: this.userForm.password,
      confirm_password: this.userForm.password 
    };

    this.authService.register(registerData).subscribe({
      next: (response) => {
        console.log('Пользователь создан!', response);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Ошибка регистрации:', err);
      }
    });
  }
}