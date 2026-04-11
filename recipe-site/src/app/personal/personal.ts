import { Component, OnInit } from '@angular/core';
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
}
