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
  userForm = {
    email: '',
    password: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onCreateAccount() {
    const registerData = {
      username: this.userForm.email,
      email: this.userForm.email,
      password: this.userForm.password,
      confirm_password: this.userForm.password
    };

    const loginData = {
      username: this.userForm.email,
      password: this.userForm.password
    };

    this.authService.register(registerData).subscribe({
      next: () => {
        console.log('Пользователь создан!');

        this.authService.login(loginData).subscribe({
          next: (loginResponse: any) => {
            console.log('Вход выполнен!', loginResponse);

            localStorage.setItem('user_token', loginResponse.access);

            this.router.navigate(['/personal-info']);
          },
          error: (err) => {
            console.error('Ошибка логина:', err);
          }
        });
      },
      error: (err) => {
        console.error('Ошибка регистрации:', err);
      }
    });
  }
}