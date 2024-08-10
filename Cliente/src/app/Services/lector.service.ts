import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';


@Injectable({
  providedIn: 'root'
})
export class LectorService {
  private apiUrl = 'http://localhost:3000/lector'; 
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}


  // Añadir un nuevo lector
  addLector(lector: { NombreCompleto: string, NumeroControl: string, Correo: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, lector);
  }

  // Actualizar un lector
  updateLector(id: number, lector: { NombreCompleto: string, NumeroControl: string, Correo: string }): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, lector);
  }

  // Eliminar un lector
  deleteLector(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  // Buscar lectores
  searchLectores(params: { busqueda?: string, NumeroControl?: string, correo?: string, NombreCompleto?: string }): Observable<any> {
    return this.http.get<any>(this.apiUrl, { params });
  }
}
