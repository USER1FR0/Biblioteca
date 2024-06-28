import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private modal: NgbActiveModal, private router: Router) {}

  close() {
    this.modal.dismiss();
  }

  onSubmit() {
    // Aquí puedes añadir lógica adicional de autenticación si es necesario
    this.modal.dismiss();
    this.router.navigate(['/menu']);
  }
}
