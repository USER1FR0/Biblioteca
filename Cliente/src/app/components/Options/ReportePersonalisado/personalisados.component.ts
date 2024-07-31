import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Libro {
  titulo: string;
  fechaPrestamo: Date ;
  fechaDevolucion: Date ;
  multasAnteriores: number;
}


@Component({
  selector: 'app-personalizado',
  templateUrl: './personalisado.component.html',
  styleUrls: ['./personalisado.component.css']
})
export class PersonalisadoComponent {
  reader = {
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    numeroControl: 'LEC12345',
    fechaAdquisicion: new Date('2023-05-15'),
    ultimoPrestador: 'María González',
    cantidadDebe: 25.00  // En dólares
  };

  librosPrestados: Libro[] = [
    {
      titulo: 'Harry Potter y la Piedra Filosofal',
      fechaPrestamo: new Date('2024-07-01'),
      fechaDevolucion: new Date('2024-07-15'),
      multasAnteriores: 0.00
    },
    {
      titulo: 'Cien Años de Soledad',
      fechaPrestamo: new Date('2024-07-10'),
      fechaDevolucion: new Date('2024-07-25'),
      multasAnteriores: 25.00  // En dólares
    }
  ];
  isVisble = false;

  showDialog() {
    this.isVisble = true;
  }

  

  closeModal() {
    this.isVisble = false;
  }
  
}
