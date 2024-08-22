import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-bibliotecarios',
  templateUrl: './bibliotecarios.component.html',
  styleUrls: ['./Registro.component.css']
})
export class RegistroBibiotecariosComponent {
  NombreCompleto: string = '';
  Correo: string = '';
  Telefono: string = '';
  NombreUsuario: string = '';
  Contrasena: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar, private http: HttpClient) {} // Inyectar HttpClient

  saveBibliotecario() {
    if (this.validateInput()) {
        const bibliotecarioData = {
            NombreCompleto: this.NombreCompleto,
            Correo: this.Correo,
            Telefono: this.Telefono,
            NombreUsuario: this.NombreUsuario,
            Contrasena: this.Contrasena
        };

        this.http.post('http://localhost:3000/bibliotecarios', bibliotecarioData) // Realizar la solicitud POST
            .subscribe({
                next: (response) => {
                    this.snackBar.open('Bibliotecario registrado exitosamente', 'Cerrar', {
                        duration: 3000,
                    });
                    this.resetFields(); // Limpiar campos después de guardar
                },
                error: (error) => {
                    if (error.status === 500) { // Suponiendo que 409 es el código para bibliotecario existente
                        this.snackBar.open('Error: El bibliotecario ya existe.', 'Cerrar', {
                            duration: 3000,
                        });
                    } else {
                        this.snackBar.open('Error al registrar bibliotecario', 'Cerrar', {
                            duration: 3000,
                        });
                    }
                    console.error('Error:', error);
                }
            });
    }
}

resetFields() {
    this.NombreCompleto = '';
    this.Telefono = '';
    this.Contrasena = '';
    this.Correo = '';
    this.NombreUsuario = '';
}

  validateInput(): boolean {
    if (!this.validateNombreCompleto()) {
      this.snackBar.open('Error: Nombre Completo es obligatorio.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateCorreo()) {
      this.snackBar.open('Error: Correo es obligatorio.', 'Cerrar', {
        duration: 3000,
      });
      return false;
    }

    if (!this.validateTelefono()) {
      this.snackBar.open('Error: Teléfono debe ser válido.', 'Cerrar', {
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
    RouterModule,
    HttpClientModule // Asegúrate de importar HttpClientModule aquí
  ],
  exports: [
    RegistroBibiotecariosComponent
  ]
})
export class RegistroBibiotecariosModule {}