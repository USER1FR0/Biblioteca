import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BibliotecarioService {
  private apiUrl = 'http://localhost:3000/bibliotecario'; 

  constructor(private http: HttpClient) {}

  // Añadir un nuevo bibliotecario
  addBibliotecario(bibliotecario: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/bibliotecario`, bibliotecario);
  }

  // Actualizar un bibliotecario
  updateBibliotecario(id: number, bibliotecario: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/bibliotecario/${id}`, bibliotecario);
  }

  // Eliminar un bibliotecario
  deleteBibliotecario(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/bibliotecario/${id}`);
  }

  // Buscar bibliotecarios
  searchBibliotecarios(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}`, { params });
  }
}
