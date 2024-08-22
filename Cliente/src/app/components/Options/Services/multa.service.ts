import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MultasService {
  private apiUrl = 'http://localhost:3000/multas';  // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  getMultas(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
    catchError(this.handleError)
    );
  }

  getLectores(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/lector');
  }

  createLector(lector: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/lector`, lector);
  }

  getPrestamos(): Observable<any[]>{
    return this.http.get<any[]>('http://localhost:3000/loan')
  }

  createPrestamo(prestamo: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/loans`, prestamo);
  }

  getMulta(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMulta(multa: any): Observable<any> {
    return this.http.post(this.apiUrl, multa).pipe(
      catchError(this.handleError)
    );
  }

  updateMulta(id: number, multa: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, multa).pipe(
      catchError(this.handleError)
    );
  }

  deleteMulta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: any): Observable<never> {
    console.error('Error:', error);
    return throwError(error.error || 'Error desconocido');
  }
}