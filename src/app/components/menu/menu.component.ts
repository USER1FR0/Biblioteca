import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SidebarService } from '../../Services/sidebar.services';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  isSidebarHidden = false;

  constructor(
    private modal: NgbModal,
    private sidebarService: SidebarService
  ) {
    this.sidebarService.sidebarHidden$.subscribe(hidden => this.isSidebarHidden = hidden);
  }

  toggleSidebar() {
    this.sidebarService.toggleSidebar();
  }
}

