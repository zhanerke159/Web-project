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
      return;
    }
    if (this.passwords.new !== this.passwords.confirm) {
      this.txt = "Passwords do not match!";
      return;
    }
    
    this.txt = "Password updated successfully! ✓";
    // Осы жерде серверге запрос жіберуге болады
    console.log('Updating password...', this.passwords);
  }
}