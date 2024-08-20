import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './components/menu/Options/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    const isAuthenticated = this.authService.isLoggedIn();
    if (!isAuthenticated) {
      alert('¡ALERTA! Se ha detectado un intento de acceso no autorizado. ¡No puedes entrar aquí sin autorización!'); 
      this.router.navigate(['/home']); // Redirige a la página de inicio de sesión
    }
    return isAuthenticated; // Permitir acceso si está autenticado
  }
}