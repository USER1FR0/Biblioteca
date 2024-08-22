import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../menu/Options/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  passwordVisible: boolean = false;
  showForgot: boolean = false;
  authData = { username: '', password: '', confirmPassword: '' };
  isRegisterMode = false;

  constructor(public modal: NgbActiveModal, private router: Router, private modalService: NgbModal, private authService: AuthService) {}

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
    const passwordField = document.getElementById('password') as HTMLInputElement | null;
    if (passwordField) {
      passwordField.type = this.passwordVisible ? 'text' : 'password';
    }
  }

  toggleMode() {
    this.isRegisterMode = !this.isRegisterMode;
    this.authData = { username: '', password: '', confirmPassword: '' };
  }

  onRegister() {
    if (this.authData.password !== this.authData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    this.authService.register(this.authData.username, this.authData.password).subscribe({
      next: (response) => {
        console.log('Respuesta del servidor:', response);
        alert(response.message);
        this.toggleMode();
      },
      error: (error) => {
        console.error('Error:', error);
        if (error.status === 409) {
          alert('El nombre de usuario ya está en uso.');
        } else {
          alert('Error del servidor. Intente nuevamente.');
        }
      }
    });
  }

  onLogin() {
    this.authService.login(this.authData.username, this.authData.password).subscribe({
        next: (response) => {
            console.log('Respuesta del servidor', response);
            alert(response.message);
            localStorage.setItem('token', response.token); // Almacena el token en localStorage
            this.modal.dismiss();
            this.router.navigate(['/menu']);
        },
        error: (error) => {
            console.error('Error:', error);
            alert('Credenciales inválidas.');
        }
    });
}

  openForgotPassword() {
    this.showForgot = true;
  }

  backToLogin() {
    this.showForgot = false;
  }
}
