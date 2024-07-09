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
    this.resetViews();
    this.showSearch = true;
  }

  showNewBook() {
    this.resetViews();
    this.showNewBooks = true;
  }

  showMulta() {
    this.resetViews();
    this.showMultas = true;
  }

  showRegistroBlibliotecarios() {
    this.resetViews();
    this.showRegistro = true;
  }

  showRegistroLectores() {
    this.resetViews();
    this.showLectores = true;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }

  redirectToHome() {
    this.resetViews();
    // Redirigir al apartado de inicio (home)
    window.location.href = '#welcome';
  }

  private resetViews() {
    this.showSearch = false;
    this.showNewBooks = false;
    this.showMultas = false;
    this.showRegistro = false;
    this.showLectores = false;
  }
}
