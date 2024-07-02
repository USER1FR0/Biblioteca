import { Component } from '@angular/core';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./Search-books.component.css']
})
export class SearchBooksComponent {
  searchQuery: string = '';
  selectedGenre: string = '';
  selectedLanguage: string = '';
  genres: string[] = ['Ficción', 'No Ficción', 'Ciencia', 'Fantasía', 'Misterio'];
  languages: string[] = ['Español', 'Inglés', 'Francés', 'Alemán'];
  books: any[] = [];

  searchBooks() {
    // Lógica de búsqueda de libros aquí. Esta es una simulación.
    this.books = [
      { title: 'Libro 1', author: 'Autor 1', genre: 'Ficción', language: 'Español' },
      { title: 'Libro 2', author: 'Autor 2', genre: 'No Ficción', language: 'Inglés' },
      { title: 'Libro 3', author: 'Autor 3', genre: 'Ciencia', language: 'Francés' },
      { title: 'Libro 4', author: 'Autor 4', genre: 'Fantasía', language: 'Alemán' },
      { title: 'Libro 5', author: 'Autor 5', genre: 'Misterio', language: 'Español' }
    ].filter(book => 
      (!this.searchQuery || book.title.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
       book.author.toLowerCase().includes(this.searchQuery.toLowerCase())) &&
      (!this.selectedGenre || book.genre === this.selectedGenre) &&
      (!this.selectedLanguage || book.language === this.selectedLanguage)
    );
  }
}
