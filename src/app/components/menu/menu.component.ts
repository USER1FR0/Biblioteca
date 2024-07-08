import { Component , Type} from '@angular/core';
import { SidebarService } from '../../Services/sidebar.services';
import { RegistroLectorComponent } from '../../Lectores/lectores.component';
import { RegistroBibiotecariosComponent } from '../RegistroBibliotecarios/bibliotecarios.component';
import { PersonalisadoComponent } from '../ReportePersonalisado/personalisados.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  
  
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
  showRegistroBibliotecarios = false;
  showPersonalisados = false;
  
  

   

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
    this.showRegistroBibliotecarios = false;
    this.showLectores = false;
    this.showPersonalisados = false;



  }

  showNewBook() {
    this.showNewBooks = true;
    this.showSearch = false;
    this.showEmailConfirm = false;
    this.showMultas = false;
    this.showRegistroBibliotecarios = false;
    this.showLectores = false;
    this.showPersonalisados = false;



  }

  showEmailConfirmation() {
    this.showEmailConfirm = true;
    this.showSearch = false;
    this.showNewBooks = false;
    this.showMultas = false;
    this.showRegistroBibliotecarios = false;
    this.showLectores = false;
    this.showPersonalisados = false;



  }

  showMulta() {
    this.showMultas = true;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;
    this.showRegistroBibliotecarios = false;
    this.showLectores = false;
    this.showPersonalisados = false;



  }
  showRegistroBlibliotecarios(){
    this.showRegistroBibliotecarios = true;
    this.showLectores = false;
    this.showRegistro = false;
    this.showMultas = false;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;
    this.showPersonalisados = false;


  }
  showRegistroLectores (){
    this.showLectores = true;
    this.showRegistro = false;
    this.showMultas = false;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;
    this.showRegistroBibliotecarios = false;
    this.showPersonalisados = false;



  }
  showPersonalisado(){
    this.showPersonalisados = true;
    this.showLectores = false;
    this.showRegistro = false;
    this.showMultas = false;
    this.showNewBooks = false;
    this.showSearch = false;
    this.showEmailConfirm = false;
    this.showRegistroBibliotecarios = false;

  }

  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  closeDropdown() {
    this.isDropdownVisible = false;
  }



}
