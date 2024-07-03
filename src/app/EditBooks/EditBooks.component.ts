import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-books',
  templateUrl: './EditBooks.component.html',
  styleUrls: ['./EditBooks.component.css']
})
export class EditBooksComponent {
  nombreLibro: string = '';
  autor: string = '';
  tema: string = '';
  categoria: string = '';
  informacion: string = '';
  isbn: string = '';
  isEditing: { [key: string]: boolean } = {
    nombreLibro: false,
    autor: false,
    tema: false,
    categoria: false,
    informacion: false,
    isbn: false
  };

  constructor(private router: Router) {}

  enableEdit(field: string) {
    this.isEditing[field] = true;
  }

  saveBook() {
    if (!this.validateInput()) {
      alert('Por favor completa todos los campos (máximo 50 caracteres para Nombre del Libro, Autor, Tema y Categoría).');
      return;
    }

    if (!this.validateISBN(this.isbn)) {
      alert('El campo ISBN debe tener la estructura válida de un ISBN.');
      return;
    }

    alert('Libro guardado con éxito');
    // Aquí puedes añadir lógica adicional para guardar el libro en tu sistema
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
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return isbnRegex.test(isbn);
  }

  confirmDelete() {
    if (confirm('¿Estás seguro de eliminar este libro?')) {
      alert('Libro eliminado con éxito');
      // Aquí puedes añadir lógica adicional para eliminar el libro de tu sistema
    }
  }
}
