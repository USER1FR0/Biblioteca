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
  selectedFile: File | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private http: HttpClient
  ) { }

  ngOnInit() {
    // Si es necesario, puedes inicializar algo aquí
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
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
  
    const formData = new FormData();
    Object.keys(this.book).forEach(key => {
      if (key !== 'Portada') {
        formData.append(key, this.book[key]);
      }
    });

    if (this.selectedFile) {
      formData.append('portada', this.selectedFile, this.selectedFile.name);
    }

    this.http.put(`http://localhost:3000/updateBook/${this.book.ISBN}`, formData).subscribe(
      (response) => {
        console.log('Libro actualizado con éxito', response);
        this.activeModal.close('save');
      },
      (error) => {
        console.error('Error al actualizar el libro', error);
        alert('Error al actualizar el libro: ' + (error.error.message || 'Ocurrió un error desconocido'));
      }
    );
  }

  deleteBook() {
    if (confirm('¿Estás seguro de que quieres eliminar este libro?')) {
      console.log('Eliminando libro con ISBN:', this.book.ISBN); // Agregar este log
      this.http.delete(`http://localhost:3000/deleteBook/${this.book.ISBN}`).subscribe(
        (response) => {
          console.log('Libro eliminado con éxito', response);
          this.activeModal.close('delete');
        },
        (error) => {
          console.error('Error al eliminar el libro', error);
          alert('Error al eliminar el libro: ' + (error.error.message || 'Ocurrió un error desconocido'));
        }
      );
    }
  }

  close() {
    this.activeModal.dismiss('cancel');
  }
}