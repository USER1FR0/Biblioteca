import { RegistroBibiotecariosComponent } from './components/Options/RegistroBibliotecarios/bibliotecarios.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import {SearchBooksComponent} from './components/Options/search-books/SearchBooks.component'
import { NewBooksComponent } from './components/Options/NewBooks/NewBooks.component';
import { MaterialModule } from './material/material.module';
import { EditBooksComponent } from './components/Options/EditBooks/EditBooks.component';
import { ForgotPasswordComponent } from './components/home/ForgotPassword/ForgotPassword.component';
import { MultasComponent } from './components/Options/multas/multas.component';
import { RegistroLectorComponent } from './components/Options/Lectores/lectores.component';
import { PersonalisadoComponent } from './components/Options/ReportePersonalisado/personalisados.component';



const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path: 'search', component: SearchBooksComponent},
  {path: 'NewBook', component: NewBooksComponent},
  { path: 'new-book', component: NewBooksComponent },
  {path: 'EditBook', component:EditBooksComponent},
  {path: 'forgot', component:ForgotPasswordComponent},
  {path: 'multas', component: MultasComponent},
  {path: 'registro', component: RegistroBibiotecariosComponent},
  {path: 'lector', component: RegistroLectorComponent},
  {path: 'personalisado', component: PersonalisadoComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MaterialModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }