import { PersonalisadoComponent } from './../../ReportePersonalisado/personalisados.component';
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
  showReporte = false;
   
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

  showEmailConfirmation() {
    this.resetViews();
    this.showEmailConfirm = true;
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
  showPersonalisado(){
    this.resetViews();
    this.showReporte = true;
  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }

  redirectToHome() {
    this.resetViews();
    window.location.href = '#welcome';
  }

  private resetViews() {
    this.showSearch = false;
    this.showNewBooks = false;
    this.showEmailConfirm = false;
    this.showMultas = false;
    this.showRegistro = false;
    this.showLectores = false;
    this.showReporte = false;
  }
}
