import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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
import { LoginComponent } from './components/home/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { SearchBooksComponent } from './components/menu/Options/search-books/SearchBooks.component';
import { NewBooksComponent } from './components/menu/Options/NewBooks/NewBooks.component';
import { EditBooksComponent } from './components/menu/Options/EditBooks/EditBooks.component';
import { ConfirmacionDeEmailComponent } from './components/menu/Options/confirmacion-de-email/confirmacion-de-email.component';
import { MultasComponent } from './components/menu/Options/multas/multas.component';
import { RegistroBibiotecariosModule } from './components/menu/Options/RegistroBibliotecarios/bibliotecarios.component';
import { RegistroLectorComponent } from './components/menu/Options/Lectores/lectores.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PersonalisadoComponent } from './components/menu/Options/ReportePersonalisado/personalisados.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from './components/home/error/error.component';
import { DevolucionDeLibrosComponent } from './components/menu/Options/devolucion-de-libros/devolucion-de-libros.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    SearchBooksComponent,
    NewBooksComponent,
    EditBooksComponent,
    ConfirmacionDeEmailComponent,
    MultasComponent,
    RegistroLectorComponent,
    PersonalisadoComponent,
    ErrorComponent,
    DevolucionDeLibrosComponent,
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
    MatSnackBarModule,
    HttpClientModule,
    BrowserAnimationsModule, 
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
