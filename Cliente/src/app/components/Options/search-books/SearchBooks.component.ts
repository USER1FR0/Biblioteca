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
  showPreview: boolean = false; // Nueva variable para mostrar la previsualización
  loading: boolean = false; // Nueva variable para controlar la pantalla de carga

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
      const blob = new Blob([new Uint8Array(book.Portada)], { type: 'image/jpeg' });
      return this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(blob));
    } else {
      return this.sanitizer.bypassSecurityTrustUrl('/assets/default-book-cover.jpg');
    }
  }

  searchBooks() {
    this.loading = true; // Mostrar pantalla de carga
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
        this.loading = false; // Ocultar pantalla de carga
      },
      (error) => {
        console.error('Error al buscar libros:', error);
        this.loading = false; // Ocultar pantalla de carga en caso de error
      }
    );
  }

  previewBook(book: any) {
    this.selectedBook = {
        title: book.Titulo, // Asegúrate de que este campo esté correctamente asignado
        author: book.Autor, // Asegúrate de que este campo esté correctamente asignado
        publisher: book.Categoria, // Asegúrate de que este campo esté correctamente asignado
        synopsis: book.Descripcion,
        cover: book.Portada ? this.getBookCoverUrl(book) : '../../../../assets/LogoUTNG.png',
        ISBN: book.ISBN,
        NumeroEjemplares: book.NumeroEjemplares || 0,
        Descripcion: book.Descripcion || '',
        Tema: book.Tema || '', // Asegúrate de incluir el campo Tema
        Categoria: book.Categoria || '' // Asegúrate de incluir el campo Categoria
    };
    this.showPreview = true; // Mostrar la previsualización
}
  closePreview() {
    this.showPreview = false; // Cerrar la previsualización
  }

  openLoanForm(book: any, event: Event) {
    event.stopPropagation(); 
    this.showLoanForm = true; 
    this.isbn = book.ISBN; // Asegúrate de que el ISBN se establezca correctamente
    this.showPreview = false; // Ocultar la previsualización
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

  openEditModal(book: any, event: Event) {
    event.stopPropagation(); // Evitar que se cierre la previsualización
    this.showPreview = false; // Asegurarse de que la previsualización esté oculta
    const modalRef = this.modalService.open(EditBooksComponent, { centered: true });
    modalRef.componentInstance.book = { 
        ...book, // Asegúrate de que se pase el libro completo
        NumeroEjemplares: book.NumeroEjemplares || 0,
        Descripcion: book.Descripcion || '',
        Tema: book.Tema || '', // Asegúrate de incluir el campo Tema
        Categoria: book.Categoria || '' // Asegúrate de incluir el campo Categoria
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