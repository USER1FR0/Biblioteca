import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MultasComponent } from './multas.component';


describe('MultasComponent', () => {
  let component: MultasComponent;
  let fixture: ComponentFixture<MultasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MultasComponent],
    })
    .compileComponents();
    fixture = TestBed.createComponent(MultasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial values', () => {
    expect(component.multa.alumno).toBe('');
    expect(component.multa.noControl).toBe('');
    expect(component.multa.correo).toBe('');
    expect(component.multa.cantMultas).toBe(0);
    expect(component.multa.adeudoTotal).toBe(0);
    expect(component.multa.fechaConsulta).toBe('');
  });

  it('should call generarReporte method when form is submitted', () => {
    spyOn(component, 'generarReporte');
    const button = fixture.debugElement.nativeElement.querySelector('button[type="submit"]');
    button.click();
    expect(component.generarReporte).toHaveBeenCalled();
  });

  it('should update the notification email', () => {
    component.multa.correo = 'test@example.com';
    fixture.detectChanges();
    const notification = fixture.debugElement.nativeElement.querySelector('.notificacion p:nth-child(2)');
    expect(notification.textContent).toContain('test@example.com');
  });


});