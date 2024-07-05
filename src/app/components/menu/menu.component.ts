import { Component } from '@angular/core';
import { SidebarService } from '../../Services/sidebar.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isSidebarHidden = false;
  showSearch = false;
  showNewBooks = false;
  showEmailConfirm = false;
  showMultas = false;
  showRegistro = false;
  isDropdownVisible = false;
  showLectores = false;
   

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarHidden$.subscribe(hidden => this.isSidebarHidden = hidden);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }

  showSearchBooks() {
    this.showSearch = true;
    this.showNewBooks = false;
    this.showEmailConfirm = false;
    this.showMultas = false;
  }

  showNewBook() {
    this.showNewBooks = true;
    this.showSearch = false;
    this.showEmailConfirm = false;
    this.showMultas = false;
  }

  showEmailConfirmation() {
    this.showEmailConfirm = true;
    this.showSearch = false;
    this.showNewBooks = false;
    this.showMultas = false;
  }

  showMulta() {
    this.showMultas = true;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;
  }
  showRegistroblibliotecarios(){
    this.showLectores = true;
    this.showRegistro = false;
    this.showMultas = false;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;

  }
  showRegistroLectores (){
    this.showRegistro = true;
    this.showMultas = false;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }



}
