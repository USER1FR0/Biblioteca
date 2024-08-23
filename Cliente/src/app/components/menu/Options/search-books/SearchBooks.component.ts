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
  books: any[] = [];
  selectedBook: any = null;
  showLoanForm: boolean = false;
  showPreview: boolean = false;
  loading: boolean = false;
  showEmailWarning: boolean = false;

  numeroControl: number = 0;
  isbn: string = '';
  fechaPrestamo: string = '';
  fechaDevolucion: string = '';
  idBibliotecario: number = 0;

  authors: string[] = [];
  publishers: string[] = [];
  lectores: any[] = [];
  filteredLectores: any[] = [];

  constructor(
    private modalService: NgbModal,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private bookService: BookService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.cargarAutoresYEditoriales();
    this.cargarLectores(); 
  }

  cargarLectores() {
    this.http.get<any>('http://localhost:3000/lector').subscribe(
      (data) => {
        this.lectores = data;
        this.filteredLectores = data; 
      },
      (error) => console.error('Error al cargar lectores:', error)
    );
  }
  
  filterLectores() {
    this.filteredLectores = this.lectores.filter(lector =>
      lector.NumeroControl.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      lector.NombreCompleto.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
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
    this.loading = true;
    this.bookService.searchBooks({
      busqueda: this.searchQuery,
      autor: this.selectedAuthor,
      categoria: this.selectedPublisher
    }).subscribe(
      (data) => {
        this.books = data.map(book => ({
          ...book,
          Portada: book.Portada ? new Uint8Array(book.Portada.data) : null
        }));
        this.loading = false;
      },
      (error) => {
        console.error('Error al buscar libros:', error);
        this.loading = false;
      }
    );
  }

  previewBook(book: any) {
    this.selectedBook = {
        title: book.Titulo,
        author: book.Autor,
        publisher: book.Categoria,
        synopsis: book.Descripcion,
        cover: book.Portada ? this.getBookCoverUrl(book) : '../../../../assets/LogoUTNG.png',
        ISBN: book.ISBN,
        NumeroEjemplares: book.NumeroEjemplares || 0,
        Descripcion: book.Descripcion || '',
        Tema: book.Tema || '',
        Categoria: book.Categoria || ''
    };
    this.showPreview = true;
  }

  closePreview() {
    this.showPreview = false;
  }

  openLoanForm(book: any, event: Event) {
    event.stopPropagation(); 
    this.showLoanForm = true; 
    this.selectedBook = book;
    this.isbn = book.ISBN; 
    this.showPreview = false; 
  }

  closeLoanForm(event?: MouseEvent) {
    if (event) {
      event.stopPropagation();
    }
    this.showLoanForm = false;
    this.resetForm();
  }

  submitLoanForm() {
    // Verificar si el número de control es válido
    if (!this.numeroControl || this.numeroControl <= 0) {
        this.snackBar.open('Ingresa un número de control válido', 'Cerrar', { duration: 3000 });
        return;
    }

    // Verificar si el ID del bibliotecario es válido
    if (!this.idBibliotecario || this.idBibliotecario <= 0) {
        this.snackBar.open('Bibliotecario no registrado', 'Cerrar', { duration: 3000 });
        return;
    }

    if (!this.fechaPrestamo || !this.fechaDevolucion) {
        this.snackBar.open('Las fechas de préstamo y devolución son requeridas', 'Cerrar', { duration: 3000 });
        return;
    }

    if (this.selectedBook.NumeroEjemplares <= 0) {
        this.snackBar.open('No hay ejemplares disponibles para prestar', 'Cerrar', { duration: 3000 });
        return;
    }

    this.http.get(`http://localhost:3000/lector/${this.numeroControl}`).subscribe(
        (lector: any) => {
            if (!lector.CorreoConfirmado) {
                this.showEmailWarning = true;
            }

            const loanData = {
                numeroControl: this.numeroControl,
                isbn: this.selectedBook.ISBN,
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

                    const updateData = {
                        NumeroEjemplares: this.selectedBook.NumeroEjemplares - 1
                    };

                    this.http.put(`http://localhost:3000/updateBook/quantity/${this.selectedBook.ISBN}`, updateData).subscribe(
                        (updateResponse) => {
                            console.log('Cantidad de libros actualizada:', updateResponse);
                        },
                        (error) => {
                            console.error('Error al actualizar la cantidad de libros:', error);
                        }
                    );
                },
                (error) => {
                    console.error('Error al registrar el préstamo:', error);
                    this.snackBar.open(error.error.message || 'Error al registrar el préstamo', 'Cerrar', { duration: 3000 });
                }
            );
        },
        (error) => {
            console.error('Error al obtener el lector:', error);
            this.snackBar.open('Error al verificar el estado del lector', 'Cerrar', { duration: 3000 });
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
    event.stopPropagation();
    this.showPreview = false;
    const modalRef = this.modalService.open(EditBooksComponent, { centered: true });
    modalRef.componentInstance.book = { 
        ...book,
        NumeroEjemplares: book.NumeroEjemplares || 0,
        Descripcion: book.Descripcion || '',
        Tema: book.Tema || '',
        Categoria: book.Categoria || ''
    };
    modalRef.result.then((result) => {
        if (result === 'save' || result === 'delete') {
            this.searchBooks();
        }
    }, (_reason) => {
        console.log('Modal cerrado');
    });
  }

  closeEmailWarning() {
    this.showEmailWarning = false;
  }
}