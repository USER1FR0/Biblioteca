import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Route, Router,RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@Component({
    selector: 'app-bibliotecarios',
    templateUrl: './bibliotecarios.component.html',
    styleUrls : ['./Registro.component.css']
})


export class RegistroBibiotecariosComponent {

  nombreBibliotecario: string = '';
  numero: string = '';
  usuario: string = '';
  contraseña : string = '';
  confirmacioncontraseña: string = '';
  direccion: string = '';

  isEditing: {[Key: string]: boolean} = {};

  enableEdit(field: string){
     this.isEditing[field] = true;
  }
  
    constructor( private router: Router) {}
  
    saveBibliotecario() {
      console.log('Guardar Bibliotecario');
  
      alert('Los datos se guardaron correctamente');
      return;      
    }
  
    validateInput(): boolean {
      return (
        this.nombreBibliotecario.trim().length > 0 && this.nombreBibliotecario.length <= 50 &&
        this.contraseña.trim().length > 0 && this.contraseña.length <= 50 &&
        this.direccion.trim().length <= 50 &&
        this.confirmacioncontraseña.trim().length <= 50
      );
    }
  
    validateNombre(nombreBibliotecario: string): boolean {
      const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
      return isbnRegex.test(this.nombreBibliotecario);
    }
  
    confirmCancel() {
     return this.usuario=("Hola")
    }
    
  }

   @NgModule ({
    declarations: [
      RegistroBibiotecariosComponent
    ],
    imports: [
      CommonModule,
      FormsModule,
      MatIconModule
    ],
    exports: [
      RouterModule,
      RegistroBibiotecariosComponent
    ]
   })
   export class RegistroBibiotecariosModule {
    
   }
  