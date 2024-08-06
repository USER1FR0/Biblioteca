import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit-books',
  templateUrl: './EditBooks.component.html',
  styleUrls: ['./EditBooks.component.css']
})
export class EditBooksComponent implements OnInit {
  @Input() book: any;

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Si es necesario, puedes inicializar algo aquí
  }

  saveBook() {
    console.log('Libro a actualizar:', JSON.stringify(this.book, null, 2));
  
    if (!this.book.ISBN || !this.book.Titulo || !this.book.Autor || !this.book.Tema || !this.book.Categoria || this.book.NumeroEjemplares === undefined) {
      console.log('Campos faltantes:', {
        ISBN: this.book.ISBN,
        Titulo: this.book.Titulo,
        Autor: this.book.Autor,
        Tema: this.book.Tema,
        Categoria: this.book.Categoria,
        NumeroEjemplares: this.book.NumeroEjemplares
      });
      alert('Por favor, completa todos los campos obligatorios');
      return;
    }
  
    this.book.NumeroEjemplares = Number(this.book.NumeroEjemplares);
  
    this.http.put(`http://localhost:3000/updateBook/${this.book.ISBN}`, this.book).subscribe(
      (response) => {
        console.log('Libro actualizado con éxito', response);
        this.activeModal.close('save');
      },
      (error) => {
        console.error('Error al actualizar el libro', error);
        if (error.error && error.error.camposFaltantes) {
          console.log('Campos faltantes según el servidor:', error.error.camposFaltantes);
        }
        alert('Error al actualizar el libro: ' + (error.error.message || 'Ocurrió un error desconocido'));
      }
    );
  }

  deleteBook() {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      this.http.delete(`http://localhost:3000/deleteBook/${this.book.ISBN}`).subscribe(
        (response) => {
          console.log('Libro eliminado con éxito', response);
          this.activeModal.close('delete');
        },
        (error) => {
          console.error('Error al eliminar el libro', error);
          // Aquí puedes manejar el error, tal vez mostrando un mensaje al usuario
        }
      );
    }
  }

  close() {
    this.activeModal.dismiss('cancel');
  }
}