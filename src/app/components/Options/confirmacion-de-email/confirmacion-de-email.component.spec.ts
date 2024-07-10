import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmacionDeEmailComponent } from './confirmacion-de-email.component';

describe('ConfirmacionDeEmailComponent', () => {
  let component: ConfirmacionDeEmailComponent;
  let fixture: ComponentFixture<ConfirmacionDeEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmacionDeEmailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmacionDeEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
