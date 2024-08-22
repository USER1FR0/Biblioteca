import { Component, OnInit } from '@angular/core';
import { PrestamoService } from './../../Options/Services/reporte.service';
import { jsPDF } from 'jspdf';

@Component({
  selector: 'app-personalizado',
  templateUrl: './personalisado.component.html',
  styleUrls: ['./personalisado.component.css'],
})
export class PersonalisadoComponent implements OnInit {
  prestamos: any[] = [];
  mensajeDeError: string | null = null;
  fechaInicio: string = '';
  fechaFin: string = '';

  columnasDisponibles = [
    { name: 'ID Préstamo', field: 'IdPrestamo', selected: true },
    { name: 'Número de Control', field: 'NumeroControl', selected: true },
    { name: 'Nombre del Lector', field: 'NombreLector', selected: true },
    { name: 'Correo del Lector', field: 'CorreoLector', selected: true },
    { name: 'ISBN', field: 'ISBN', selected: true },
    { name: 'Título del Libro', field: 'TituloLibro', selected: true },
    { name: 'Autor del Libro', field: 'AutorLibro', selected: true },
    { name: 'ID Bibliotecario', field: 'IdBibliotecario', selected: true },
    { name: 'Fecha de Préstamo', field: 'FechaPrestamo', selected: true },
    { name: 'Fecha de Devolución', field: 'FechaDevolucion', selected: true },
    { name: 'Estado del Préstamo', field: 'Estado', selected: true }
  ];

  constructor(private prestamoService: PrestamoService) {}

  ngOnInit(): void {
    this.cargarPrestamos();
  }

  actualizarReporte(): void {
    this.cargarPrestamos();
  }

  cargarPrestamos() {
    this.prestamoService.getPrestamos(this.fechaInicio, this.fechaFin).subscribe(
      (data) => {
        if (data.length === 0) {
          this.mensajeDeError = 'No se encontraron préstamos disponibles.';
        } else {
          this.prestamos = data;
          this.mensajeDeError = null;
        }
      },
      (error) => {
        this.mensajeDeError =
          'Hubo un problema al cargar los préstamos. Por favor, intenta nuevamente más tarde.';
      }
    );
  }

  exportarPDF(): void {
    const doc = new jsPDF();
    let y = 10;

    // Generar encabezados del PDF basados en las columnas seleccionadas
    let x = 10;
    this.columnasDisponibles.forEach(column => {
      if (column.selected) {
        doc.text(column.name, x, y);
        x += 40; // Ajusta el espaciado horizontal entre columnas
      }
    });

    y += 10; // Salto de línea después del encabezado

    // Generar datos de las filas del PDF basados en las columnas seleccionadas
    this.prestamos.forEach(prestamo => {
      x = 10;
      this.columnasDisponibles.forEach(column => {
        if (column.selected) {
          doc.text(String(prestamo[column.field]), x, y);
          x += 40; // Ajusta el espaciado horizontal entre columnas
        }
      });
      y += 10; // Salto de línea después de cada fila
    });

    doc.save('reporte_prestamos.pdf');
  }
}
