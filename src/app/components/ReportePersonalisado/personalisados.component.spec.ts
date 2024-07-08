import { AppComponent } from './../../app.component';
import { async } from 'rxjs';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PersonalisadoComponent } from './personalisados.component';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';

describe ('PersonalisadosComponent', () => {

  
  let Component: PersonalisadoComponent;
  let component: PersonalisadoComponent;
  let fixture: ComponentFixture<PersonalisadoComponent>;
  let isVisble=false;
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display reader information', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.reader-info').textContent).toContain('Juan Pérez');
    expect(compiled.querySelector('.reader-info').textContent).toContain('juan.perez@example.com');
    expect(compiled.querySelector('.reader-info').textContent).toContain('LEC12345');
  });

  it('should display borrowed books information', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.borrowed-books').textContent).toContain('Harry Potter y la Piedra Filosofal');
    expect(compiled.querySelector('.borrowed-books').textContent).toContain('Cien Años de Soledad');
  });

  it('should display additional information', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.additional-info').textContent).toContain('15 de mayo de 2023');
    expect(compiled.querySelector('.additional-info').textContent).toContain('María González');
    expect(compiled.querySelector('.additional-info').textContent).toContain('$25.00');
  });
});

