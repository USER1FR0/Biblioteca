import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-confirmacion-de-email',
  templateUrl: './confirmacion-de-email.component.html',
  styleUrls: ['./confirmacion-de-email.component.css']
})
export class ConfirmacionDeEmailComponent {
  email: string = '';
  confirmationCode: string = '';
  showConfirmationModal: boolean = false;
  errorMessage: string = '';

  constructor(private snackBar: MatSnackBar) {}

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
