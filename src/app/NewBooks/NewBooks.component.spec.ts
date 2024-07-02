import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewBooksComponent } from './NewBooks.component';
describe('NewBooksComponent', () => {
  let component: NewBooksComponent;
  let fixture: ComponentFixture<NewBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewBooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should validate ISBN', () => {
    expect(component.validateISBN('978-3-16-148410-0')).toBe(true);
    expect(component.validateISBN('9783161484100')).toBe(true);
    expect(component.validateISBN('978-3-16-148410-X')).toBe(false);
    expect(component.validateISBN('978316148410X')).toBe(false);
  });

  it('should validate input', () => {
    component.nombreLibro = 'Libro de Prueba';
    component.autor = 'Autor de Prueba';
    component.tema = '';
    component.categoria = '';
    expect(component.validateInput()).toBe(false);

    component.tema = 'Tema de Prueba';
    component.categoria = 'Categoría de Prueba';
    expect(component.validateInput()).toBe(true);
  });
});

