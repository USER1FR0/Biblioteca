import { Component } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

  saveBook() {
    if (!this.validateInput()) {
      alert('Por favor completa todos los campos (máximo 50 caracteres para Nombre_Libro, Autor, Tema y Categoría).');
      return;
    }

    if (!this.validateISBN(this.isbn)) {
      alert('El campo ISBN debe tener la estructura válida de un ISBN.');
      return;
    }

    alert('Libro guardado con éxito');
    // Aquí puedes añadir lógica adicional para guardar el libro en tu sistema
    // y redirigir o realizar otras acciones necesarias
  }

  validateInput(): boolean {
    return (
      this.nombreLibro.trim().length > 0 && this.nombreLibro.length <= 50 &&
      this.autor.trim().length > 0 && this.autor.length <= 50 &&
      this.tema.trim().length <= 50 &&
      this.categoria.trim().length <= 50
    );
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
