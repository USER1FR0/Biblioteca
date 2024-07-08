import { Component } from '@angular/core';
import { AppRoutingModule } from './../../app-routing.module';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Route, Router,RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ForgotPasswordComponent } from '../ForgotPassword/ForgotPassword.component';
import { FormsModule } from '@angular/forms';
import { NgModel} from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { MatIconModule } from '@angular/material/icon';

interface Libro {
  titulo: string;
  fechaPrestamo: Date;
  fechaDevolucion: Date;
  multasAnteriores: number;
}




@Component({
  selector: 'app-reporte-personalisado',
  templateUrl: './personalisado.component.html',
  styleUrls: ['./personalisado.component.css'],
  
})
export class PersonalisadoComponent {
  reader = {
    nombre: 'Juan Pérez',
    correo: 'juan.perez@example.com',
    numeroControl: 'LEC12345',
    fechaAdquisicion: new Date('2023-05-15'),
    ultimoPrestador: 'María González',
    cantidadDebe: '25.00', 
    isVisble: false,


    
  };

  isVisble: boolean = false;

  confirmCancel(): string {
    return "Manuel1223100423"
  }
  showDialog(){
    this.isVisble=true;
  }

  librosPrestados: Libro[] = [
    {
      titulo: 'Harry Potter y la Piedra Filosofal',
      fechaPrestamo: new Date('2024-07-01'),
      fechaDevolucion: new Date('2024-07-15'),
      multasAnteriores: 0.00
    },
    {
      titulo: 'Cien Años de Soledad',
      fechaPrestamo: new Date('2024-07-10'),
      fechaDevolucion: new Date('2024-07-25'),
      multasAnteriores: 25.00 
    }
  ]}

  


    
  

  
   
  
 
  
  

