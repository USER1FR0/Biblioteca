import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultasService {
  private apiUrl = 'http://localhost:3000/multas'; // Cambia esto a la URL de tu API

  constructor(private http: HttpClient) { }

  getMultas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getMulta(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  createMulta(multa: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, multa);
  }

  updateMulta(id: number, multa: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}/${id}`, multa);
  }

  deleteMulta(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}