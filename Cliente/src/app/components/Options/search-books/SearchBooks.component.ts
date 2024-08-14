import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBooksComponent } from '../EditBooks/EditBooks.component';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BookService } from '../Services/BookService';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-search-books',
  templateUrl: './search-books.component.html',
  styleUrls: ['./search-books.component.css']
})
export class SearchBooksComponent implements OnInit {
  searchQuery: string = '';
  selectedAuthor: string = '';
  selectedPublisher: string = '';
  selectedPublicationDate: string = '';
  selectedTitle: string = '';
  books: any[] = [];
  selectedBook: any = null;
  showLoanForm: boolean = false;

  numeroControl: number = 0;
  isbn: string = '';
  fechaPrestamo: string = '';
  fechaDevolucion: string = '';
  idBibliotecario: number = 0;

  authors: string[] = [];
  publishers: string[] = [];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.cargarAutoresYEditoriales();
  }

  cargarAutoresYEditoriales() {
    this.http.get<any>('http://localhost:3000/api/libros/autores-editoriales').subscribe(
      (data) => {
        this.authors = data.autores;
        this.publishers = data.editoriales;
      },
      (error) => console.error('Error al cargar autores y editoriales:', error)
    );
  }

  getBookCoverUrl(book: any): SafeUrl {
    if (book.Portada) {
      // Asumiendo que Portada es un array de bytes
      const blob = new Blob([new Uint8Array(book.Portada)], { type: 'image/jpeg' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    } else {
      // Usa una URL absoluta para la imagen por defecto
      return this.sanitizer.bypassSecurityTrustUrl('/assets/default-book-cover.jpg');
    }
  }
  searchBooks() {
    this.bookService.searchBooks({
      busqueda: this.searchQuery,
      autor: this.selectedAuthor,
      categoria: this.selectedPublisher,
      titulo: this.selectedTitle
    }).subscribe(
      (data) => {
        this.books = data.map(book => ({
          ...book,
          Portada: book.Portada ? new Uint8Array(book.Portada.data) : null
        }));
      },
      (error) => {
        console.error('Error al buscar libros:', error);
      }
    );
  }


  previewBook(book: any) {
    this.selectedBook = {
      title: book.Titulo,
      author: book.Autor,
      publisher: book.Categoria,
      publicationDate: book.FechaPublicacion,
      synopsis: book.Descripcion,
      cover: book.ImagenPortada,
      ISBN: book.ISBN
    };
  }

  openLoanForm(book: any, event: Event) {
    event.stopPropagation();
    this.selectedBook = book;
    this.showLoanForm = true;
    this.isbn = book.ISBN;
  }

  closeLoanForm(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showLoanForm = false;
    this.resetForm();
  }

  submitLoanForm() {
    if (!this.fechaPrestamo || !this.fechaDevolucion) {
        this.snackBar.open('Las fechas de préstamo y devolución son requeridas', 'Cerrar', { duration: 3000 });
        return;
    }

    const loanData = {
      numeroControl: this.numeroControl,
      isbn: this.isbn,
      fechaPrestamo: this.fechaPrestamo,
      fechaDevolucion: this.fechaDevolucion,
      idBibliotecario: this.idBibliotecario,
  };

    console.log('Datos del préstamo a enviar:', loanData);

    this.http.post('http://localhost:3000/loanBook', loanData).subscribe(
        (response: any) => {
            this.snackBar.open(response.message, 'Cerrar', { duration: 3000 });
            this.closeLoanForm();
            this.searchBooks();
        },
        (error) => {
            console.error('Error al registrar el préstamo:', error);
            this.snackBar.open(error.error.message || 'Error al registrar el préstamo', 'Cerrar', { duration: 3000 });
        }
    );
}

  resetForm() {
    this.numeroControl = 0;
    this.isbn = '';
    this.fechaPrestamo = '';
    this.fechaDevolucion = '';
    this.idBibliotecario = 0;
  }

  openEditModal(book: any) {
    const modalRef = this.modalService.open(EditBooksComponent, { centered: true });
    modalRef.componentInstance.book = { 
      ...book,
      NumeroEjemplares: book.NumeroEjemplares || 0,
      Descripcion: book.Descripcion || ''
    };
    modalRef.result.then((result) => {
      if (result === 'save' || result === 'delete') {
        this.searchBooks();
      }
    }, (_reason) => {
      console.log('Modal cerrado');
    });
  }
}