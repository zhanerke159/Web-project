import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
//import { AppRoutingModule } from "../app-routing.module";

@Component({
  selector: 'app-personal',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, RouterLinkActive /*AppRoutingModule*/], // FormsModule міндетті түрде керек
  templateUrl: './personal.html',
  styleUrls: ['./personal.css']
})
export class PersonalComponent implements OnInit {
  selectedMenu: string = 'personal';
  constructor(private cdr: ChangeDetectorRef) {}
  // Пайдаланушы мәліметтері
  
  // Бос объект құрамыз, адам өзі толтырады
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
    // Бет ашылғанда браузер жадында бұрын сақталған дерек бар ма, тексереміз
    const data = localStorage.getItem('userProfile');
    if (data) {
      this.userFields = JSON.parse(data);
    }
  }

  txt: string = '';
  saveChanges() {
    // Адам жазған мәліметтерді браузер жадына "userProfile" деген атпен сақтаймыз
    localStorage.setItem('userProfile', JSON.stringify(this.userFields));
    this.txt = " Successfully saved ✓";
  }

  discardChanges() {
    // Жазғандарын сақтағысы келмесе, инпуттарды босатамыз
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
    // Егер браузердегі сақталғанды да өшіру керек болса:
    // localStorage.removeItem('userProfile');
    const data = localStorage.getItem('userProfile');
    if (data) {
      this.userFields = JSON.parse(data); // LocalStorage-дағы ескі деректі қайта жүктеу
      this.txt = "Changes discarded";
  }
  }
  isValidEmail(): boolean {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(this.userFields.email);
  }
  openPicker() {
  const dateInput = document.getElementById('dob-input') as HTMLInputElement;
  if (dateInput &&  dateInput.showPicker) {
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
        // Суретті айнымалыға береміз
        this.userFields.avatar = e.target.result;
        
        // 3. МАҢЫЗДЫ: Angular-ға суреттің өзгергенін және HTML-ді жаңарту керек екенін айтамыз
        this.cdr.detectChanges(); 
        
        console.log('Сурет экранда көрінуі тиіс');
      };

      reader.readAsDataURL(file);
    }
  }

    deletePhoto() {
        this.userFields.avatar = null;
        this.cdr.detectChanges(); // Өшіргенде де жаңартуды сұраймыз
        this.txt = "Photo removed from view. Don't forget to save!";
      }

}
