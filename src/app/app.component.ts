// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Biblioteca';
  description = 'Bienvenid@s a la pagina oficial de la biblioteca escolar UTNG.';

  onClick() {
    alert('¡Has hecho clic en el botón!');
  }
}
