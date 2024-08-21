import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-devolucion-de-libros',
  templateUrl: './devolucion-de-libros.component.html',
  styleUrls: ['./devolucion-de-libros.component.css'],
  animations: [
    trigger('fadeOut', [
      state('void', style({ opacity: 0, transform: 'translateY(-20px)' })),
      transition(':leave', [
        animate(300)
      ])
    ])
  ]
})
export class DevolucionDeLibrosComponent implements OnInit {
  loans: any[] = [];
  loading: boolean = false;
  searchControl: string = '';
  searchTitle: string = '';
  searchISBN: string = '';

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.loadLoans(); // Cargar los préstamos al iniciar
  }

  loadLoans() {
    this.loading = true;
    this.http.get<any>('http://localhost:3000/loans')
      .subscribe(
        (data) => {
          this.loans = data;
          this.loading = false;
        },
        (error) => {
          console.error('Error al cargar préstamos:', error);
          this.loading = false;
        }
      );
  }

  returnBook(loanId: number, isbn: string) {
    const index = this.loans.findIndex(loan => loan.id === loanId);
    if (index !== -1) {
      // Eliminar el préstamo de la lista antes de hacer la solicitud
      const loanToRemove = this.loans[index];
      this.loans.splice(index, 1);

      this.http.delete(`http://localhost:3000/returnBook/${loanId}`)
        .subscribe(
          (response) => {
            this.snackBar.open('Libro devuelto exitosamente', 'Cerrar', { duration: 3000 });
          },
          (error) => {
            console.error('Error al devolver el libro:', error);
            this.snackBar.open('Error al devolver el libro', 'Cerrar', { duration: 3000 });
            // Revertir la eliminación si hay un error
            this.loans.splice(index, 0, loanToRemove);
          }
        );
    }
  }

  filterLoans() {
    return this.loans.filter(loan => {
      const matchesControl = loan.NumeroControl.includes(this.searchControl);
      const matchesTitle = loan.Titulo.toLowerCase().includes(this.searchTitle.toLowerCase());
      const matchesISBN = loan.ISBN.includes(this.searchISBN); // Filtrar por ISBN
      return matchesControl && matchesTitle && matchesISBN;
    });
  }
}