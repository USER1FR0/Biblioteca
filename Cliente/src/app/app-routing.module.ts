import { RegistroBibiotecariosComponent } from './components/Options/RegistroBibliotecarios/bibliotecarios.component';
import { NgModule } from '@angular/core';
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
import { AuthGuard } from './auth.guard';
import { ErrorComponent } from './error/error.component';



const routes: Routes = [
  {
    path : '',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  { path: 'menu', component: MenuComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent }, 
  { path: 'error', component: ErrorComponent },
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path: 'search', component: SearchBooksComponent, canActivate: [AuthGuard] },
  {path: 'NewBook', component: NewBooksComponent, canActivate: [AuthGuard] },
  { path: 'new-book', component: NewBooksComponent, canActivate: [AuthGuard]  },
  {path: 'EditBook', component:EditBooksComponent, canActivate: [AuthGuard] },
  {path: 'forgot', component:ForgotPasswordComponent, canActivate: [AuthGuard] },
  {path: 'multas', component: MultasComponent, canActivate: [AuthGuard] },
  {path: 'registro', component: RegistroBibiotecariosComponent, canActivate: [AuthGuard] },
  {path: 'lector', component: RegistroLectorComponent, canActivate: [AuthGuard] },
  {path: 'personalisado', component: PersonalisadoComponent, canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes),
            MaterialModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }