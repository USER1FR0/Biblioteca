import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  private sidebarHiddenSubject = new BehaviorSubject<boolean>(false);
  sidebarHidden$ = this.sidebarHiddenSubject.asObservable();

  toggleSidebar() {
    this.sidebarHiddenSubject.next(!this.sidebarHiddenSubject.value);
  }
}
