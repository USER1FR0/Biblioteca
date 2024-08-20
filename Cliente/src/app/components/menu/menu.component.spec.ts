import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { SidebarService } from '../menu/Options/Services/sidebar.services';


describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let sidebarService: SidebarService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [ SidebarService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    sidebarService = TestBed.inject(SidebarService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should toggle sidebar visibility', () => {
    expect(component.isSidebarHidden).toBeFalse();
    component.toggleSidebar();
    expect(component.isSidebarHidden).toBeTrue();
    component.toggleSidebar();
    expect(component.isSidebarHidden).toBeFalse();
  });
});
