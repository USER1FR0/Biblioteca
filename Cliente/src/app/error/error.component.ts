import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {
  constructor(private router: Router) {} // Inyecta Router

  ngOnInit() {
    this.showModal(); // Muestra el modal al cargar el componente
  }

  showModal() {
    const modal = document.getElementById('virusAlert');
    if (modal) {
      modal.style.display = 'block'; // Muestra el modal
    }
  }

  closeModal() {
    const modal = document.getElementById('virusAlert');
    if (modal) {
      modal.style.display = 'none'; // Oculta el modal
    }
  }

  goToHome() {
    this.closeModal(); // Cierra el modal antes de redirigir
    this.router.navigate(['/home']); // Redirige a la pantalla de inicio
  }
}