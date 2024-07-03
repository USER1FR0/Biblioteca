import { Component } from '@angular/core';

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
  controlNumber: string = '';
  name: string = '';

  authors: string[] = ['Autor 1', 'Autor 2', 'Autor 3']; // Ejemplo de autores
  publishers: string[] = ['Editorial 1', 'Editorial 2', 'Editorial 3']; // Ejemplo de editoriales

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
    this.controlNumber = '';
    this.name = '';
  }

  submitLoanForm() {
    console.log('Solicitando préstamo para el libro:', this.selectedBook);
    console.log('Número de Control:', this.controlNumber);
    console.log('Nombre:', this.name);
    this.closeLoanForm();
    // Lógica para solicitar el préstamo del libro
  }
}
