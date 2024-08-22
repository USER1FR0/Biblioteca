import { PrestamoService } from './reporte.service';
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('PrestamoService', () => {
  let service: PrestamoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PrestamoService]
    });

    service = TestBed.inject(PrestamoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch loan data successfully', () => {
    const dummyLoans = [
      { id: 1, bookTitle: 'Libro 1', borrowerName: 'Lector 1', dateLoaned: '2024-08-01' },
      { id: 2, bookTitle: 'Libro 2', borrowerName: 'Lector 2', dateLoaned: '2024-08-02' }
    ];

    service.getPrestamos().subscribe(loans => {
      expect(loans.length).toBe(2);
      expect(loans).toEqual(dummyLoans);
    });

    const req = httpMock.expectOne(`${service}/loans`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyLoans);
  });

  it('should handle errors correctly', () => {
    service.getPrestamos().subscribe(
      () => fail('should have failed with the 500 error'),
      (error) => {
        expect(error.status).toBe(500);
      }
    );

    const req = httpMock.expectOne(`${service}/prestamos`);
    expect(req.request.method).toBe('GET');
    req.flush('Error loading loan data', { status: 500, statusText: 'Server Error' });
  });
});
