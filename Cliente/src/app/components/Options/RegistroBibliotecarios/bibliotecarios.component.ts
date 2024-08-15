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
  IdAdmin: string = '';
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
    }
  }

  validateInput(): boolean {
    if (!this.validateNombreCompleto()) {
      this.snackBar.open('Error: Nombre Completo es obligatorio.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateCorreo()) {
      this.snackBar.open('Error: Correo .', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateTelefono()) {
      this.snackBar.open('Error: Teléfono deve ser valido.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateIdAdmin()) {
      this.snackBar.open('Error: IdAdmin no existe.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateNombreUsuario()) {
      this.snackBar.open('Error: Nombre de Usuario es obligatorio.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateContrasena()) {
      this.snackBar.open('Error: Contraseña es obligatoria.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    return true;
  }

  validateNombreCompleto(): boolean {
    return this.NombreCompleto.trim().length > 0 && this.NombreCompleto.length <= 50;
  }

  validateCorreo(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.Correo) && this.Correo.trim().length <= 100;
  }

  validateTelefono(): boolean {
    const phoneRegex = /^\d{7,15}$/;
    return phoneRegex.test(this.Telefono);
  }

  validateIdAdmin(): boolean {
    return this.IdAdmin.trim().length <= 10;
  }

  validateNombreUsuario(): boolean {
    return this.NombreUsuario.trim().length > 0 && this.NombreUsuario.length <= 50;
  }

  validateContrasena(): boolean {
    return this.Contrasena.trim().length > 0 && this.Contrasena.length <= 255;
  }

  confirmCancel() {
    this.NombreCompleto = '';
    this.Telefono = '';
    this.Contrasena = '';
    this.Correo = '';
    this.IdAdmin = '';
    this.NombreUsuario = '';
  
    this.snackBar.open('El Registro se ha cancelado', 'Cerrar', {
      duration: 3000,
    });
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
export class RegistroBibiotecariosModule {}
