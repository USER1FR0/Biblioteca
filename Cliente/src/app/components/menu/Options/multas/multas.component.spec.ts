import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MultasComponent } from './multas.component';
import { Component } from '@angular/core';

describe('MultasComponent', () => {
  let component: MultasComponent;
  let fixture: ComponentFixture<MultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultasComponent],
      imports: [FormsModule]
    })
    .compileComponents();
    fixture = TestBed.createComponent(MultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //it('should have initial values', () => {
  //expect(component.multa.alumno).toBe('');
  //  expect(component.multa.noControl).toBe('');
    //expect(component.multa.correo).toBe('');
    //expect(component.multa.cantMultas).toBe(0);
    //expect(component.multa.adeudoTotal).toBe(0);
    //expect(component.multa.fechaConsulta).toBe('');
    //expect(component.multa.diasTranscurridos).toBe(0);
  });

  it('should call generarReporte method when "Generar Reporte" button is clicked', () => {
    spyOn(component, 'generarReporte');
    const button = fixture.debugElement.nativeElement.querySelector('button.btn-secondary');
    button.click();
    expect(component.generarReporte).toHaveBeenCalled();
  });

  it('should call registrar method when form is submitted', () => {
    spyOn(component, 'registrar');
    const form = fixture.debugElement.nativeElement.querySelector('form');
    form.dispatchEvent(new Event('submit'));
    expect(component.registrar).toHaveBeenCalled();
  });
