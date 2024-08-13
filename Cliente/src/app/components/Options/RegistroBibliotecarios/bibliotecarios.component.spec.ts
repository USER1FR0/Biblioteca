import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroBibiotecariosComponent } from './bibliotecarios.component';

describe('RegistroBibiotecariosComponent', () => {
  let component: RegistroBibiotecariosComponent;
  let fixture: ComponentFixture<RegistroBibiotecariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroBibiotecariosComponent],

    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroBibiotecariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate Bibliotecario', () => {
        expect(component.saveBibliotecario()) 
  });

});
