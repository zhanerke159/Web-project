import { Component } from '@angular/core';
import { AuthService } from '../services/register.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent {
  loginData = {
    username: '', 
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: (response: any) => {
        console.log('Успешный вход!', response);
        localStorage.setItem('access_token', response.access);
        localStorage.setItem('refresh_token', response.refresh);

        this.router.navigate(['/account']); 
      },
      error: (err) => {
        console.error('Ошибка входа:', err);
        alert('Неверный email или пароль');
      }
    });
  }
}