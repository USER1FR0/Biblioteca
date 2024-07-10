import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBooksComponent } from '../EditBooks/EditBooks.component';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Route, Router,RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent {
  searchQuery: string = '';
  selectedAuthor: string = '';
  selectedPublisher: string = '';
  selectedPublicationDate: string = '';
  selectedTitle: string = '';
  books: any[] = [];
  selectedBook: any = null;
  showLoanForm: boolean = false;

  idPrestamo: string = '';
  controlNumber: string = '';
  isbn: string = '';
  fechaPrestamo: string = '';
  fechaDevolucion: string = '';
  idBibliotecario: string = '';
  name: string = '';

  authors: string[] = ['Autor 1', 'Autor 2', 'Autor 3']; // Ejemplo de autores
  publishers: string[] = ['Editorial 1', 'Editorial 2', 'Editorial 3']; // Ejemplo de editoriales

  constructor(private modalService: NgbModal) {}

  searchBooks() {
    this.books = [
      { 
        title: 'Libro 1', 
        author: 'Autor 1', 
        publisher: 'Editorial 1', 
        publicationDate: '2023-01-01', 
        cover: 'https://th.bing.com/th/id/OIP.TRRgYF0fkwxCCjh7IY452QHaLX?rs=1&pid=ImgDetMain%27',
        synopsis: 'Este es un resumen ficticio del libro 1. Es una historia apasionante sobre aventuras y descubrimientos.' 
      },
      { 
        title: 'Libro 2', 
        author: 'Autor 2', 
        publisher: 'Editorial 2', 
        publicationDate: '2022-05-15', 
        cover: 'https://th.bing.com/th/id/OIP.VeVzdwKD88BaHTneyvu-FQHaLe?rs=1&pid=ImgDetMain%27',
        synopsis: 'Este es un resumen ficticio del libro 2. Trata sobre la importancia de la amistad y el valor.' 
      },
      { 
        title: 'Libro 3', 
        author: 'Autor 1', 
        publisher: 'Editorial 1', 
        publicationDate: '2022-10-20', 
        cover: 'https://th.bing.com/th/id/OIP.eZnzofnDruZMeO3Ep0WudQHaL0?rs=1&pid=ImgDetMain%27',
        synopsis: 'Este es un resumen ficticio del libro 3. Narra una aventura épica en un mundo fantástico.' 
      }
    ].filter(book =>
      (!this.searchQuery ||
       book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
       book.author.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (!this.selectedAuthor || book.author === this.selectedAuthor) &&
      (!this.selectedPublisher || book.publisher === this.selectedPublisher) &&
      (!this.selectedPublicationDate || book.publicationDate === this.selectedPublicationDate) &&
      (!this.selectedTitle || book.title === this.selectedTitle)
    );
  }

  previewBook(book: any) {
    this.selectedBook = book;
  }

  openLoanForm(book: any, event: Event) {
    event.stopPropagation();
    this.selectedBook = book;
    this.showLoanForm = true;
  }

  closeLoanForm(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showLoanForm = false;
    this.resetForm();
  }

  submitLoanForm() {
    // Aquí puedes manejar el envío del formulario, por ejemplo, llamando a un servicio para guardar los datos del préstamo
    console.log('Formulario de préstamo enviado:', {
      idPrestamo: this.idPrestamo,
      controlNumber: this.controlNumber,
      isbn: this.isbn,
      fechaPrestamo: this.fechaPrestamo,
      fechaDevolucion: this.fechaDevolucion,
      idBibliotecario: this.idBibliotecario,
      name: this.name
    });
    this.closeLoanForm();
  }

  resetForm() {
   
    this.controlNumber = '';
    this.isbn = '';
    this.fechaPrestamo = '';
    this.fechaDevolucion = '';
    this.idBibliotecario = '';
    this.name = '';
  }

  openEditModal(book: any) {
    const modalRef = this.modalService.open(EditBooksComponent, { centered: true });
    modalRef.componentInstance.book = book; // Pasar el libro seleccionado al componente EditBooks
    modalRef.result.then((result) => {
      if (result === 'save' || result === 'delete') {
        this.searchBooks(); // Refrescar la lista de libros después de guardar o eliminar
      }
    }, (_reason) => {
      console.log('Modal dismissed');
    });
  }
}
