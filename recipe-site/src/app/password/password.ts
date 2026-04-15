import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../logout/logout';
import { ApiService } from '../services/recipe';

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
  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService) { }

  userFields = { username: '', avatar: null };

  passwords = {
    current_password: '',
    new_password: '',
    confirm_password: ''
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
    if (!this.passwords.current_password || !this.passwords.new_password || !this.passwords.confirm_password) {
      this.txt = "Please fill all fields!";
      this.isError = true;
      return;
    }
    if (this.passwords.new_password !== this.passwords.confirm_password) {
      this.txt = "Passwords do not match!";
      this.isError = true;
      return;
    }

    this.apiService.change_password(this.passwords).subscribe({
      next: (res: any) => {
        this.txt = "Password updated successfully! ✓";
        this.isError = false;
        this.passwords = { current_password: '', new_password: '', confirm_password: '' };
        this.cdr.detectChanges();
      },
      error: (err:any) => {
        this.txt = err.error.error || "Server error occurred!";
        this.isError = true;
        this.cdr.detectChanges();
      }
    });
  }

 
  cancelChanges() {
    this.passwords = { current_password: '', new_password: '', confirm_password: '' };
    this.txt = '';
    this.isError = false;
  }

}
