import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { NavbarModule } from './options/pages/layout-page/navbar-page/navbar.module';

import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBooksComponent } from './search-books/SearchBooks.component';
import { NewBooksComponent } from './NewBooks/NewBooks.component';
import { EditBooksComponent } from './EditBooks/EditBooks.component';
import { ForgotPasswordComponent } from './components/ForgotPassword/ForgotPassword.component';
import { ConfirmacionDeEmailComponent } from './confirmacion-de-email/confirmacion-de-email.component';
import { MultasComponent } from './components/multas/multas.component';
import { RegistroBibiotecariosModule } from './components/RegistroBibliotecarios/bibliotecarios.component';
import {  RegistroLectorModule } from './Lectores/lectores.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import { PersonalisadoModule } from './ReportePersonalisado/personaisado.module';
import { NavbarModule } from './options/pages/layout-page/navbar-page/navbar.module';
import { RegistroLectorComponent } from './Lectores/lectores.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    SearchBooksComponent,
    NewBooksComponent,
    EditBooksComponent,
    ForgotPasswordComponent,
    ConfirmacionDeEmailComponent,
    MultasComponent,
    EditBooksComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RegistroBibiotecariosModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NavbarModule,
    CommonModule,
    PersonalisadoModule
    
  ],
  providers: [
    provideAnimationsAsync()
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  provideAnimationsAsync()
})
export class AppModule { }
