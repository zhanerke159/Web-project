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
    // 1. Толтырылмаған өрістерді тексеру
    if (!this.passwords.current || !this.passwords.new || !this.passwords.confirm) {
      this.txt = "Please fill all fields!";
      this.isError = true;
      return;
    }

    // 2. Парольдер сәйкес келмесе (Мұнда тазаламай-ақ қойған дұрыс, адам қатесін түзете алуы үшін)
    if (this.passwords.new !== this.passwords.confirm) {
      this.txt = "Passwords do not match!";
      this.isError = true;
      // Бұл жерден тазалауды алып тастадым
      return;
    }
  
    // 3. Бәрі дұрыс болса
    this.txt = "Password updated successfully! ✓";
    this.isError = false;
    
    // Сәтті аяқталғанда ғана тазалаймыз
    this.passwords = { current: '', new: '', confirm: '' };
    console.log('Password updated successfully');
  }
  cancelChanges() {
    // Инпуттарды тазалаймыз
    this.passwords = {
      current: '',
      new: '',
      confirm: ''
    };
    
    // Хабарламаны өшіреміз (қалауыңша)
    this.txt = '';
    this.isError = false;

    console.log('Inputs cleared');
  }
}