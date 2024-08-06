import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditBooksComponent } from '../EditBooks/EditBooks.component';
import { HttpClient } from '@angular/common/http';

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

  idPrestamo: string = '';
  controlNumber: string = '';
  isbn: string = '';
  fechaPrestamo: string = '';
  fechaDevolucion: string = '';
  idBibliotecario: string = '';
  name: string = '';

  authors: string[] = [];
  publishers: string[] = [];

  constructor(private modalService: NgbModal, private http: HttpClient) {}

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

  searchBooks() {
    const params = {
      busqueda: this.searchQuery,
      autor: this.selectedAuthor,
      categoria: this.selectedPublisher,
      titulo: this.selectedTitle
    };
  
    this.http.get<any[]>('http://localhost:3000/searchBooks', { params }).subscribe(
      (data) => {
        this.books = data.map(book => ({
          ...book,
          ImagenPortada: book.ImagenPortada || 'assets/default-book-cover.jpg'
        }));
        console.log('Libros recibidos:', this.books); // Para depuración
      },
      (error) => console.error('Error al buscar libros:', error)
    );
  }

  previewBook(book: any) {
    this.selectedBook = {
      title: book.Titulo,
      author: book.Autor,
      publisher: book.Categoria, // Asumiendo que 'Categoria' se usa como editorial
      publicationDate: book.FechaPublicacion, // Si tienes este campo en tu base de datos
      synopsis: book.Descripcion,
      cover: book.ImagenPortada // Si tienes este campo en tu base de datos
    };
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