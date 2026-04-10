import { Component } from '@angular/core';
import { AuthService } from '../services/register.service';

@Component({
  selector: 'app-register',
  imports: [],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class RegisterComponent {
  userForm = {
    username: '',
    email: '',
    password: '',
    confirm_password: ''
  };

  constructor(private authService: AuthService) { }

  onCreateAccount() {
    this.authService.register(this.userForm).subscribe({
      next: (response) => {
        alert('Пользователь успешно создан!');
        console.log(response);
      },
      error: (err) => {
        console.error('Ошибка:', err.error);
        alert('Ошибка регистрации: ' + JSON.stringify(err.error));
      }
    });
  }
}
