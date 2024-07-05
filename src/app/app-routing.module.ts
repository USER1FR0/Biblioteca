import { RegistroBibiotecariosComponent } from './components/RegistroBibliotecarios/bibliotecarios.component';
import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBooksComponent } from './search-books/SearchBooks.component';
import { NewBooksComponent } from './NewBooks/NewBooks.component';
import { MaterialModule } from './material/material.module';
import { EditBooksComponent } from './EditBooks/EditBooks.component';
import { ForgotPasswordComponent } from './components/ForgotPassword/ForgotPassword.component';
import { MultasComponent } from './components/multas/multas.component';
import { RegistroLectorComponent } from './Lectores/lectores.component';



const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'menu',component:MenuComponent},
  {path: 'search', component: SearchBooksComponent },
  {path: 'NewBook', component: NewBooksComponent},
  {path: 'EditBook', component:EditBooksComponent},
  {path: 'forgot', component:ForgotPasswordComponent},
  {path: 'multas', component: MultasComponent},
  {path: 'registro', component: RegistroBibiotecariosComponent},
  {path: 'lector', component: RegistroLectorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MaterialModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }