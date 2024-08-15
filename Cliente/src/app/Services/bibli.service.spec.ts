import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BibliotecarioService } from './bibliotecario.service';

describe('BibliotecarioService', () => {
  let service: BibliotecarioService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BibliotecarioService]
    });
    service = TestBed.inject(BibliotecarioService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should add a bibliotecario', () => {
    const dummyBibliotecario = { NombreCompleto: 'Carlos Lopez', Correo: 'carlos.lopez@example.com', Telefono: '1234567890', IdAdmin: 1223100500, NombreUsuario: 'carlosL', Contrasena: 'password123' };

    service.addBibliotecario(dummyBibliotecario).subscribe(response => {
      expect(response).toEqual({ message: 'Bibliotecario registrado exitosamente' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/bibliotecario`);
    expect(req.request.method).toBe('POST');
    req.flush({ message: 'Bibliotecario registrado exitosamente' });
  });

  it('should update a bibliotecario', () => {
    const dummyBibliotecario = { NombreCompleto: 'Carlos Lopez', Correo: 'carlos.lopez@example.com', Telefono: '1234567890', IdAdmin: 1223100500, NombreUsuario: 'carlosL', Contrasena: 'password123' };

    service.updateBibliotecario(1, dummyBibliotecario).subscribe(response => {
      expect(response).toEqual({ message: 'Bibliotecario actualizado exitosamente' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/bibliotecario/1`);
    expect(req.request.method).toBe('PUT');
    req.flush({ message: 'Bibliotecario actualizado exitosamente' });
  });

  it('should delete a bibliotecario', () => {
    service.deleteBibliotecario(1).subscribe(response => {
      expect(response).toEqual({ message: 'Bibliotecario eliminado exitosamente' });
    });

    const req = httpMock.expectOne(`${service['apiUrl']}/bibliotecario/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({ message: 'Bibliotecario eliminado exitosamente' });
  });

  it('should search bibliotecarios', () => {
    const dummyResponse = [
      { NombreCompleto: 'Carlos Lopez', Correo: 'carlos.lopez@example.com', Telefono: '1234567890', IdAdmin: 1223100500, NombreUsuario: 'carlosL', Contrasena: 'password123' }
    ];

    service.searchBibliotecarios({ busqueda: 'Carlos' }).subscribe(response => {
      expect(response).toEqual(dummyResponse);
    });

    const req = httpMock.expectOne(`${service['apiUrl']}?busqueda=Carlos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyResponse);
  });
});
