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
  passwordVisible: boolean = false;
  showForgot: boolean = false;
  username: string = ' ';
  password: string = ' ';

  constructor(private modal: NgbActiveModal, private router: Router, private modalService: NgbModal) {}
 
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement | null;
    if (passwordField) {
      passwordField.type = this.passwordVisible ? 'text' : 'password';
    }
  }

  onSubmit() {
    // Aquí deberías implementar la lógica de autenticación
    if (this.username && this.password) {
      console.log('User name:', this.username);
      console.log('Password:', this.password);
      // Lógica de autenticación aquí (por ejemplo, enviar solicitud al servidor)
      // Si la autenticación es exitosa, redirecciona a la página '/menu'
      // Simulación de redirección
      this.modal.dismiss();
      this.router.navigate(['/menu']);
      this.showForgot = false; // Oculta el formulario de recuperación de contraseña después del login
    }
  }

  openForgotPassword() {
    this.showForgot = true;
  }

  backToLogin() {
    this.showForgot = false;
  }
}
