import { Component, EventEmitter, Output } from '@angular/core'; // Importa EventEmitter y Output desde @angular/core
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './ForgotPassword.component.html',
  styleUrls: ['./ForgotPassword.component.css']
})
export class ForgotPasswordComponent {

  email: string = '';
  @Output() backToLogin = new EventEmitter<void>(); // Define la salida backToLogin como un EventEmitter

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

  goBackToLogin() {
    this.backToLogin.emit(); // Emite el evento hacia arriba cuando se hace clic en "Volver"
  }
}
