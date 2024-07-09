import { RegistroLectorComponent } from './lectores.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../components/login/login.component';
import { HomeComponent } from '../components/home/home.component';
import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

describe('RegistroLectorComponent', () => {
  let component: RegistroLectorComponent;
  let fixture: ComponentFixture<RegistroLectorComponent>;
  let isVisble=false;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroLectorComponent],
      imports: [
        FormsModule,
        RouterTestingModule
      ]

    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroLectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach ( () => {
    fixture = TestBed.createComponent(RegistroLectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  )

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate Lector', () => {
    spyOn(component, 'saveLector').and.callThrough();
    component.saveLector();
    expect(component.saveLector).toHaveBeenCalled();
  });

  it('should validate input', () => {
    component.nombreLector = 'Nombre Prueba';
    component.control = 'Control Prueba';
    component.correo = 'Correo';
    component.carrera = 'Carrera';
    expect(component.validateInput()).toBe(false);

    component.control = 'Numero Control de Prueba';
    expect(component.validateInput()).toBe(true);
  });
});


