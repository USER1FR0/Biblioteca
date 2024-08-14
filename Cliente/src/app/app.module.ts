import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material.module';
import { NavbarModule } from './options/pages/layout-page/navbar-page/navbar.module';
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBooksComponent } from './components/Options/search-books/SearchBooks.component';
import { NewBooksComponent } from './components/Options/NewBooks/NewBooks.component';
import { EditBooksComponent } from './components/Options/EditBooks/EditBooks.component';
import { ForgotPasswordComponent } from './components/home/ForgotPassword/ForgotPassword.component';
import { ConfirmacionDeEmailComponent } from './components/Options/confirmacion-de-email/confirmacion-de-email.component';
import { MultasComponent } from './components/Options/multas/multas.component';
import { RegistroBibiotecariosModule } from './components/Options/RegistroBibliotecarios/bibliotecarios.component';
import { RegistroLectorComponent } from './components/Options/Lectores/lectores.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonalisadoComponent } from './components/Options/ReportePersonalisado/personalisados.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';


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
    RegistroLectorComponent,
    PersonalisadoComponent
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
    MatInputModule,
    MatFormFieldModule,
    MatCardModule,
    MatListModule,
    NavbarModule,
    MatSnackBarModule,
    HttpClientModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
