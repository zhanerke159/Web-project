import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
//import { AppRoutingModule } from "../app-routing.module";

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterLinkActive /*AppRoutingModule*/], // FormsModule міндетті түрде керек
  templateUrl: './password.html',
  styleUrls: ['./password.css']
})
export class PasswordComponent implements OnInit {
  isError: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}

  userFields = { username: '', avatar: null };
  
  // Пароль объектісі
  passwords = {
    current: '',
    new: '',
    confirm: ''
  };

  // Көз (show/hide) күйлері
  showCurrent = false;
  showNew = false;
  showConfirm = false;

  txt = '';

  ngOnInit() {
    const data = localStorage.getItem('userProfile');
    if (data) {
      this.userFields = JSON.parse(data);
    }
  }

  updatePassword() {
    if (!this.passwords.current || !this.passwords.new || !this.passwords.confirm) {
      this.txt = "Please fill all fields!";
      this.isError = true; // Қате! (Қызыл болады)
      return;
  }

  // 2. Парольдер сәйкес келмесе
      if (this.passwords.new !== this.passwords.confirm) {
        this.txt = "Passwords do not match!";
        this.isError = true; // Қате! (Қызыл болады)
        this.passwords = { current: '', new: '', confirm: '' };
        return;
      }
  
  // 3. Бәрі дұрыс болса
      this.txt = "Password updated successfully! ✓";
      this.isError = false; // Қате емес! (Жасыл болады)
    // Осы жерде серверге запрос жіберуге болады
    this.passwords = { current: '', new: '', confirm: '' };
    console.log('Updating password...', this.passwords);
    
  }
}