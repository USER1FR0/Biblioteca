import { SidebarService } from './../Services/sidebar.services';
import { AppRoutingModule } from '../app-routing.module';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, NgModule } from '@angular/core';
import { Route, Router,RouterModule, Routes } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgModel} from '@angular/forms';
import { LoginComponent } from '../components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { HomeComponent } from '../components/home/home.component';

@Component({
  selector: 'app-registro-lector',
  templateUrl: './lectores.component.html',
  styleUrls: ['./lectores.componen.css']
})
export class RegistroLectorComponent {
  nombreLector: string = '';
  control: string = '';
  correo: string = '';
  carrera: string = '';
  isVisble: boolean=false;

  limpiarDatos(){
    this.carrera = '';
    this.control = '';
    this.correo = '';
    this.nombreLector= '';
    this.lector = '';
  }


  validateInput(): boolean {
    if (!this.nombreLector || !this.control || !this.correo || !this.carrera) {
      return false; 
    }
    
    if (this.control.includes('Numero Control')) {
      return true; 
    }

    return true; // En este ejemplo simplificado, consideramos que es válido
  }
  saveLector (){

  }

  showDialog(){
    this.isVisble=true;
  }
  lector: any = {}; // Asumiendo que lector es un objeto con la propiedad especialidad
}

   
  ;

  


const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'login',component:LoginComponent},
  {path: 'bibliotecarios',component: RegistroLectorComponent},
];

@NgModule ({
declarations: [
  RegistroLectorComponent
],
imports: [
  RouterModule.forRoot(routes),
  CommonModule,
  FormsModule,
  MatIconModule
],
exports: [
  RouterModule,
  RegistroLectorComponent
]
})
export class RegistroLectorModule {
 
}
