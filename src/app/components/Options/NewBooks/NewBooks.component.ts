
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Route, Router,RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-newbooks',
  templateUrl: './NewBooks.component.html',
  styleUrls: ['./NewBooks.component.css']
})
export class NewBooksComponent {  
  nombreLibro: string = '';
  autor: string = '';
  tema: string = '';
  categoria: string = '';
  informacion: string = '';
  isbn: string = '';
  ejemplares: number | null = null;

  constructor(private router: Router) {}

  saveBook() {
    if (!this.nombreLibro.trim()) {
      alert('El campo "Nombre del Libro" es obligatorio.');
      return;
    }

    if (!this.autor.trim()) {
      alert('El campo "Autor" es obligatorio.');
      return;
    }

    if (!this.tema.trim()) {
      alert('El campo "Tema" es obligatorio.');
      return;
    }

    if (!this.categoria.trim()) {
      alert('El campo "Categoría" es obligatorio.');
      return;
    }

    if (this.nombreLibro.length > 50 || this.autor.length > 50 || this.tema.length > 50 || this.categoria.length > 50) {
      alert('Los campos Nombre_Libro, Autor, Tema y Categoría deben tener un máximo de 50 caracteres.');
      return;
    }

    if (!this.validateISBN(this.isbn)) {
      alert('El campo ISBN debe tener la estructura válida de un ISBN.');
      return;
    }

    if (this.ejemplares === null) {
      alert('El campo "Número de ejemplares" es obligatorio.');
      return;
    }

    if (this.ejemplares < 0) {
      alert('El "Número de ejemplares" no puede ser menor que cero.');
      return;
    }

    alert('Libro guardado con éxito');
    this.router.navigate(['/menu']);
    // Aquí puedes añadir lógica adicional para guardar el libro en tu sistema
    // y redirigir o realizar otras acciones necesarias
  }

  validateISBN(isbn: string): boolean {
    // Expresión regular para validar ISBN-13 o ISBN-10
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return isbnRegex.test(isbn);
  }

  confirmCancel() {
    if (confirm('¿Estás seguro de cancelar el registro?')) {
      this.router.navigate(['/menu']);
    }
  }
}
