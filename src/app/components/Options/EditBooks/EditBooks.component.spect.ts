import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditBooksComponent } from './EditBooks.component';

describe('EditBooksComponent', () => {
  let component: EditBooksComponent;
  let fixture: ComponentFixture<EditBooksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditBooksComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBooksComponent);
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

  it('should enable editing', () => {
    component.enableEdit('nombreLibro');
    expect(component.isEditing['nombreLibro']).toBe(true);
  });

  it('should save book', () => {
    spyOn(window, 'alert');
    component.saveBook();
    expect(window.alert).toHaveBeenCalledWith('Libro guardado con éxito');
  });

  it('should confirm delete', () => {
    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'alert');
    component.confirmDelete();
    expect(window.alert).toHaveBeenCalledWith('Libro eliminado con éxito');
  });
});
