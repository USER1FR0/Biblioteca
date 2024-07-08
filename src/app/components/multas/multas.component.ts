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
    fechaConsulta: '',
    diasTranscurridos: 0
  };

  constructor(private router: Router) {}

  registrar() {
    console.log('Multa registrada:', this.multa);
    alert('Multa registrada');
  }

  generarReporte() {
    console.log('Reporte generado para:', this.multa);
    alert('Reporte generado');
    this.enviarCorreo(this.multa.correo, 'Reporte de Multa', 'Su reporte de multa ha sido generado.');
  }

  enviarCorreo(destinatario: string, asunto: string, mensaje: string) {
    console.log(`Correo enviado a ${destinatario} con asunto "${asunto}" y mensaje "${mensaje}"`);
    alert(`Correo enviado a ${destinatario} con asunto "${asunto}" y mensaje "${mensaje}"`);
  }
}


