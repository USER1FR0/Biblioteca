import { Component } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(
    private modal: NgbModal
) {}


  openModal() {
    const modalRef = this.modal.open(LoginComponent, {
        backdrop: 'static',
        size: 'lg',
        centered: true
    });

}
}