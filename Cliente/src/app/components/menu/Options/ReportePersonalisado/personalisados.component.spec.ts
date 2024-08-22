import { async } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { PersonalisadoComponent } from './personalisados.component';

describe ('PersonalisadoComponent', () => 
  
  beforeEach(async () => {
    TestBed.configureTestingModule({
      declarations: [
        PersonalisadoComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(PersonalisadoComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should display reader information', () => {
    const fixture = TestBed.createComponent(PersonalisadoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.reader-info').textContent).toContain('Juan Pérez');
    expect(compiled.querySelector('.reader-info').textContent).toContain('juan.perez@example.com');
    expect(compiled.querySelector('.reader-info').textContent).toContain('LEC12345');
  });

  it('should display borrowed books information', () => {
    const fixture = TestBed.createComponent(PersonalisadoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.borrowed-books').textContent).toContain('Harry Potter y la Piedra Filosofal');
    expect(compiled.querySelector('.borrowed-books').textContent).toContain('Cien Años de Soledad');
  });

  it('should display additional information', () => {
    const fixture = TestBed.createComponent(PersonalisadoComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.additional-info').textContent).toContain('15 de mayo de 2023');
    expect(compiled.querySelector('.additional-info').textContent).toContain('María González');
    expect(compiled.querySelector('.additional-info').textContent).toContain('$25.00');
  });

