import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-edit-books',
  templateUrl: './EditBooks.component.html',
  styleUrls: ['./EditBooks.component.css']
})
export class EditBooksComponent {
  @Input() book: any;
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

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.book) {
      this.nombreLibro = this.book.title;
      this.autor = this.book.author;
      this.tema = this.book.topic;
      this.categoria = this.book.category;
      this.informacion = this.book.information;
      this.isbn = this.book.isbn;
    }
  }

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
    this.activeModal.close('save'); // Cerrando el modal
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
      this.activeModal.close('delete'); // Cerrando el modal
    }
  }
}
