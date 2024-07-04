import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPassword.component'; // Importa el componente de recuperación de contraseña

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  showForgot=false;
  constructor(private modal: NgbActiveModal, private router: Router, private modalService: NgbModal) {}
  close() {
    this.modal.dismiss();
  }

  onSubmit() {
    // Aquí puedes añadir lógica adicional de autenticación si es necesario
    this.modal.dismiss();
    this.router.navigate(['/menu']);
  }

  openForgotPassword() {
    // Método para abrir el modal de recuperación de contraseña
    this.showForgot=true;
  }
}
