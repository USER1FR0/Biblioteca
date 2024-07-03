import { Component } from '@angular/core';

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

  onSubmitEmail() {
    // Lógica para enviar el correo de confirmación
    // Aquí llamarías a tu servicio para enviar el correo electrónico
    this.showConfirmationModal = true;
  }

  onSubmitCode() {
    // Lógica para validar el código de confirmación
    if (this.confirmationCode === '123456') { // Ejemplo de código correcto
      alert('Correo validado con éxito');
      this.showConfirmationModal = false;
    } else {
      this.errorMessage = 'Código incorrecto. Por favor, inténtelo de nuevo.';
    }
  }

  resendCode() {
    // Lógica para reenviar el código de confirmación
    this.errorMessage = '';
    alert('Código reenviado. Por favor, revise su correo.');
  }

  closeModal(event: MouseEvent) {
    // Lógica para cerrar el modal cuando se hace clic fuera de la ventana modal
    this.showConfirmationModal = false;
  }
}
