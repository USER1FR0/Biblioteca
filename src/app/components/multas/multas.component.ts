import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css']
})
export class MultasComponent {
  multa = {
    alumno: '',
    noControl: '',
    correo: '',
    cantMultas: 0,
    adeudoTotal: 0,
    fechaConsulta: ''
  };

  constructor(private router: Router) {}
  regresar() {
    // Implementar lógica para regresar
  }

  generarReporte() {
    // Implementar lógica para generar reporte
    // Enviar correo si es necesario
    // Notificar al usuario
  }
}
