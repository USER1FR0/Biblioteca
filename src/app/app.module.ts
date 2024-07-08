import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { SearchBooksComponent } from './search-books/SearchBooks.component';
import { NewBooksComponent } from './NewBooks/NewBooks.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditBooksComponent } from './EditBooks/EditBooks.component';
import { MaterialModule } from './material/material.module';
import { ForgotPasswordComponent } from './components/ForgotPassword/ForgotPassword.component';
import { ConfirmacionDeEmailComponent } from './confirmacion-de-email/confirmacion-de-email.component';
import { MultasComponent } from './components/multas/multas.component';
import { RegistroBibiotecariosModule } from './components/RegistroBibliotecarios/bibliotecarios.component';
import {  RegistroLectorModule } from './Lectores/lectores.component';
import { PersonalisadoComponent } from './components/ReportePersonalisado/personalisados.component';

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
    PersonalisadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RegistroBibiotecariosModule,
    RegistroLectorModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    NavbarModule
    
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
