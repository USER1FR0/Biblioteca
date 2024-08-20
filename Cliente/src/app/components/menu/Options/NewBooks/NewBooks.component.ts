
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from '../Services/BookService';

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
  portada: File | null = null;

  constructor(private bookService: BookService, private router: Router) {}

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.portada = file;
    }
  }

  saveBook() {
    console.log('Datos del libro antes de enviar:', {
      isbn: this.isbn,
      titulo: this.nombreLibro,
      autor: this.autor,
      tema: this.tema,
      categoria: this.categoria,
      descripcion: this.informacion,
      numeroEjemplares: this.ejemplares,
      portada: this.portada ? this.portada.name : 'No seleccionada'
    });
  

    if (!this.isbn || !this.nombreLibro || !this.autor || !this.tema || !this.categoria || this.ejemplares === null) {
      alert('Todos los campos obligatorios deben ser completados.');
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

    const newBook = {
      isbn: this.isbn,
      titulo: this.nombreLibro,
      autor: this.autor,
      tema: this.tema,
      categoria: this.categoria,
      descripcion: this.informacion || '',
      numeroEjemplares: this.ejemplares
    };

    this.bookService.addBook(newBook, this.portada).subscribe(
      (response: any) => {
        console.log('Respuesta del servidor:', response);
        alert(response.message || 'Libro guardado con éxito');
        this.router.navigate(['/menu']);
      },
      (error) => {
        console.error('Error durante el registro del libro:', error);
        if (error.error && error.error.message) {
          alert('Error: ' + error.error.message);
        } else {
          alert('Error durante el registro del libro');
        }
      }
    );
  }

  validateISBN(isbn: string): boolean {
    const isbnRegex = /^(?=(?:\D*\d){10}(?:(?:\D*\d){3})?$)[\d-]+$/;
    return isbnRegex.test(isbn);
  }

  confirmCancel() {
    if (confirm('¿Estás seguro de cancelar el registro?')) {
      this.router.navigate(['/menu']);
    }
  }
}
