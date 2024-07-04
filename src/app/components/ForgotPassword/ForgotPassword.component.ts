import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';

  constructor(private modal: NgbActiveModal, private http: HttpClient) {}

  close() {
    this.modal.dismiss();
  }

  onSubmit() {
    // Aquí enviarías un código de recuperación al correo electrónico proporcionado
    this.http.post('/api/send-reset-code', { email: this.email }).subscribe(response => {
      alert('Código de recuperación enviado. Por favor, revisa tu correo electrónico.');
      this.modal.dismiss();
    }, error => {
      alert('Error al enviar el código de recuperación. Por favor, intenta de nuevo.');
    });
  }
}
