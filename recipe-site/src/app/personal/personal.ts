import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LogoutComponent } from '../logout/logout';
import { ApiService } from '../services/recipe';
import { UserProfile } from '../models/userProf';
import { Router } from '@angular/router';



@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterLinkActive, LogoutComponent],
  templateUrl: './personal.html',
  styleUrls: ['./personal.css']
})
export class PersonalComponent implements OnInit {
  isLogoutOpen: boolean = false;

  selectedMenu: string = 'personal';
  constructor(private cdr: ChangeDetectorRef, private apiService: ApiService
    , private router: Router
  ) { }


  userFields = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    social: '',
    avatar: null
  };

  ngOnInit() {
    const data = localStorage.getItem('userProfile');
    if (data) {
      this.userFields = JSON.parse(data);
    }
  }

  txt: string = '';


  discardChanges() {
    this.userFields = {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      phone: '',
      dob: '',
      social: '',
      avatar: null
    };

    localStorage.removeItem('userProfile');

    this.txt = "Changes discarded and form cleared";
    this.cdr.detectChanges();
  }
  isValidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.userFields.email);
  }
  openPicker() {
    const dateInput = document.getElementById('dob-input') as HTMLInputElement;
    if (dateInput && dateInput.showPicker) {
      dateInput.showPicker(); // Күнтізбені бағдарламалы түрде ашады
    }
  }
  validatePhone(event: any) {
    const input = event.target.value;

    event.target.value = input.replace(/[^0-9+]/g, '');

    this.userFields.phone = event.target.value;
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.userFields.avatar = e.target.result;

        this.cdr.detectChanges();

        console.log('Сурет экранда көрінуі тиіс');
      };

      reader.readAsDataURL(file);
    }
  }

  deletePhoto() {
    this.userFields.avatar = null;
    this.cdr.detectChanges();
    this.txt = "Photo removed from view. Don't forget to save!";
  }


  saveChanges() {
    localStorage.setItem('userProfile', JSON.stringify(this.userFields));

    const profileData = {
      first_name: this.userFields.firstName,
      last_name: this.userFields.lastName,
      user_name: this.userFields.username,
      email: this.userFields.email,
      phone_number: this.userFields.phone,
      birth_date: this.userFields.dob,
    };

    this.apiService.updateUserProfile(profileData).subscribe({
      next: (res) => {
        this.txt = "Successfully saved to server ✓";
        this.cdr.detectChanges();
        setTimeout(() => {
          this.router.navigate(['/account']);
        }, 1000);
      },
      error: (err) => {
        console.error('Ошибка при сохранении на бэкенд:', err);
        this.txt = "Saved locally, but server error ✗";
      }
    });
  }

}