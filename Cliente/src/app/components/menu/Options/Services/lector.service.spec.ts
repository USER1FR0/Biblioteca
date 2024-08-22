import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LectorService } from './lector.service';
import { MatSnackBar } from '@angular/material/snack-bar';


describe('LectorService', () => {
  let service: LectorService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LectorService]
    });
    service = TestBed.inject(LectorService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a lector', () => {
    const dummyLector = { NombreCompleto: 'Juan Perez', NumeroControl: '123456', Correo: 'juan.perez@example.com' };

    service.addLector(dummyLector).subscribe(response => {
      expect(response).toEqual({ message: 'Lector registrado exitosamente' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Lector registrado exitosamente' });
  });

  it('should update a lector', () => {
    const dummyLector = { NombreCompleto: 'Juan Perez', NumeroControl: '123456', Correo: 'juan.perez@example.com' };

    service.updateLector(1, dummyLector).subscribe(response => {
      expect(response).toEqual({ message: 'Lector actualizado exitosamente' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Lector actualizado exitosamente' });
  });

  it('should delete a lector', () => {
    service.deleteLector(1).subscribe(response => {
      expect(response).toEqual({ message: 'Lector eliminado exitosamente' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Lector eliminado exitosamente' });
  });

  it('should search lectores', () => {
    const dummyResponse = [
      { NombreCompleto: 'Juan Perez', NumeroControl: '123456', Correo: 'juan.perez@example.com' }
    ];

    service.searchLectores({ busqueda: 'Juan' }).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?busqueda=Juan`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
