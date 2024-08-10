import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-bibliotecarios',
  templateUrl: './bibliotecarios.component.html',
  styleUrls: ['./Registro.component.css']
})
export class RegistroBibiotecariosComponent {
  NombreCompleto: string = '';
  Correo: string = '';
  Telefono: string = '';
  IAdmin: string = '';
  NombreUsuario: string = '';
  Contrasena: string = '';
  

  isEditing: { [Key: string]: boolean } = {};

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  enableEdit(field: string) {
    this.isEditing[field] = true;
  }

  saveBibliotecario() {
    if (this.validateInput()) {
      console.log('Guardar Bibliotecario');
      this.snackBar.open('Los datos se guardaron correctamente', 'Cerrar', {
        duration: 3000,
      });
    } else {
      this.snackBar.open('Error: Revisa los campos', 'Cerrar', {
        duration: 3000,
      });
    }
  }

  validateInput(): boolean {
    return (
      this.NombreCompleto.trim().length > 0 && this.NombreCompleto.length <= 50 &&
      this.Contrasena.trim().length > 0 && this.Contrasena.length <= 255 &&
      this.Contrasena.trim().length <= 255 &&
      this.IAdmin.trim().length <= 10 &&
      this.NombreUsuario.trim().length <= 50
    );
  }

  validateNombre(nombreBibliotecario: string): boolean {
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return isbnRegex.test(this.NombreCompleto);
  }

  confirmCancel() {
    this.NombreUsuario = "Hola";
  }
}

@NgModule({
  declarations: [
    RegistroBibiotecariosComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    RouterModule
  ],
  exports: [
    RegistroBibiotecariosComponent
  ]
})
export class RegistroBibiotecariosModule { }
