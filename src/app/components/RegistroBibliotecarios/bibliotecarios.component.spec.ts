import { RegistroLectorComponent } from './../../Lectores/lectores.component';

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

  it('should validate input', () => {
    component.nombreBibliotecario = 'Nombre Prueba';
    component.numero = 'Telefono Prueba';
    component.direccion = 'Direccion';
    component.usuario = 'Usuario';
    expect(component.validateInput()).toBe(false);
    component.contraseña = 'Contraseña Prueba';
    expect(component.validateInput()).toBe(true);
  });
});

