import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DevolucionDeLibrosComponent } from './devolucion-de-libros.component';

describe('DevolucionDeLibrosComponent', () => {
  let component: DevolucionDeLibrosComponent;
  let fixture: ComponentFixture<DevolucionDeLibrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DevolucionDeLibrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DevolucionDeLibrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
