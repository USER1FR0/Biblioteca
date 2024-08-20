import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // Añadir un nuevo libro
  addBook(book: any, portada: File | null): Observable<any> {
    const formData = new FormData();
    Object.keys(book).forEach(key => {
      if (book[key] !== null && book[key] !== undefined) {
        formData.append(key, book[key]);
        console.log(`Añadiendo ${key}: ${book[key]}`);
      }
    });
    if (portada) {
      formData.append('portada', portada, portada.name);
      console.log(`Añadiendo portada: ${portada.name}`);
    } else {
      console.log('No se ha añadido portada');
    }
    console.log('FormData completo:', formData);
    return this.http.post(`${this.apiUrl}/addBook`, formData);
  }
  // Obtener todos los libros
  getAllBooks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/books`);
  }

  // Buscar libros
  searchBooks(params: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/searchBooks`, { params });
  }

  // Obtener un libro por ISBN
  getBookByISBN(isbn: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/book/${isbn}`);
  }

  // Actualizar un libro
  updateBook(isbn: string, book: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/updateBook/${isbn}`, book);
  }

  // Eliminar un libro
  deleteBook(isbn: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteBook/${isbn}`);
  }

  // Obtener autores y editoriales
  getAuthorsAndPublishers(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/libros/autores-editoriales`);
  }
}