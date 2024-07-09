import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-registro-lector',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.componen.css']
})
export class RegistroLectorComponent {
  nombreLector: string = '';
  control: string = '';
  correo: string = '';
  carrera: string = '';
  isVisble: boolean=false;

  limpiarDatos(){
    this.carrera = '';
    this.control = '';
    this.correo = '';
    this.nombreLector= '';
    this.lector = '';
  }

  showConfirmationModal: boolean = false;
  confirmationCode: string = '';
  errorMessage: string = '';

  constructor(private snackBar: MatSnackBar) {}

  validateInput(): boolean {
    if (!this.nombreLector || !this.control || !this.correo) {
      return false; 
    }

    const emailPattern = /^.*@(gmail\.com|utng\.edu\.mx)$/;
    if (!emailPattern.test(this.correo)) {
      return false;
    }

    if (this.control.includes('Numero Control')) {
      return true; 
    }

    return true; 
  }

  openConfirmationModal() {
    if (this.validateInput()) {
      this.showConfirmationModal = true;
    } else {
      this.snackBar.open('Por favor, complete todos los campos correctamente.', 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  showDialog(){
    this.isVisble=true;
  }
  lector: any = {}; // Asumiendo que lector es un objeto con la propiedad especialidad
}

   
  ;

  onSubmitEmail() {
    this.snackBar.open('Correo de confirmación enviado', 'Cerrar', {
      duration: 3000,
    });
    this.showConfirmationModal = true;
  }

  onSubmitCode() {
    if (this.confirmationCode === '123456') { // Ejemplo de código correcto
      this.snackBar.open('Correo validado con éxito', 'Cerrar', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
      this.showConfirmationModal = false;
    } else {
      this.errorMessage = 'Código incorrecto. Por favor, inténtelo de nuevo.';
      this.snackBar.open(this.errorMessage, 'Cerrar', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
    }
  }

  resendCode() {
    this.errorMessage = '';
    this.snackBar.open('Código reenviado. Por favor, revise su correo.', 'Cerrar', {
      duration: 3000,
    });
  }

  closeModal(event: MouseEvent) {
    this.showConfirmationModal = false;
  }
}
