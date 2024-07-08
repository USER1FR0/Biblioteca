// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biblioteca';
  isSidebarHidden = true;
  showSearch = false;
  showNewBooks = false;
  showEmailConfirm = false;
  showMultas = false;

  toggleSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }

  showSearchBooks() {
    this.resetViews();
    this.showSearch = true;
  }

  showNewBook() {
    this.resetViews();
    this.showNewBooks = true;
  }

  showEmailConfirmation() {
    this.resetViews();
    this.showEmailConfirm = true;
  }

  showMulta() {
    this.resetViews();
    this.showMultas = true;
  }

  resetViews() {
    this.showSearch = false;
    this.showNewBooks = false;
    this.showEmailConfirm = false;
    this.showMultas = false;
  }
}