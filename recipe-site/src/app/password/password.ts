import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../logout/logout';

@Component({
  selector: 'app-password',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterLinkActive, LogoutComponent], 
  templateUrl: './password.html',
  styleUrls: ['./password.css']
})
export class PasswordComponent implements OnInit {
  isLogoutOpen: boolean = false;
  isError: boolean = false;
  constructor(private cdr: ChangeDetectorRef) {}

  userFields = { username: '', avatar: null };
  
  passwords = {
    current: '',
    new: '',
    confirm: ''
  };

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
      this.isError = true;
      return;
    }

    if (this.passwords.new !== this.passwords.confirm) {
      this.txt = "Passwords do not match!";
      this.isError = true;
      return;
    }
  
    this.txt = "Password updated successfully! ✓";
    this.isError = false;
    
    this.passwords = { current: '', new: '', confirm: '' };
    console.log('Password updated successfully');
  }
  cancelChanges() {
    this.passwords = {
      current: '',
      new: '',
      confirm: ''
    };
    
    this.txt = '';
    this.isError = false;

    console.log('Inputs cleared');
  }
}