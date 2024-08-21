import { PrestamoService } from './../../../Services/reporte.service';
import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface Libro {
  titulo: string;
  fechaPrestamo: Date;
  fechaDevolucion: Date;
  multasAnteriores: number;
}

@Component({
  selector: 'app-personalizado',
  templateUrl: './personalisado.component.html',
  styleUrls: ['./personalisado.component.css'],
})
export class PersonalisadoComponent implements OnInit {
  prestamos: any[] = [];
  mensajeDeError: string | null = null;

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  actualizarReporte(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.prestamoService.getPrestamos().subscribe(
      (data) => {
        if (data.length === 0) {
          this.mensajeDeError = 'No se encontraron préstamos disponibles.';
        } else {
          this.prestamos = data;
        }
      },
      (error) => {
        if (error.status === 404) {
          console.error('No se encontraron préstamos.', error);
          this.mensajeDeError = 'No se encontraron préstamos disponibles.';
        } else {
          console.error('Error al cargar los préstamos.', error);
          this.mensajeDeError =
            'Hubo un problema al cargar los préstamos. Por favor, intenta nuevamente más tarde.';
        }
      }
    );
  }
}