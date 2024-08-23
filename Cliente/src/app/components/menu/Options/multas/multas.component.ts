import { Component, OnInit } from '@angular/core';
import { MultasService } from '../Services/multa.service';
import { error } from 'jquery';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css']
})
export class MultasComponent implements OnInit {
  multas: any[] = [];
  lectores: any[] = [];
  prestamos: any[] = [];
  selectedMulta: any = null;
  isEditing = false;
  alertMessage: string | null = null;
  alertType: 'success' | 'error' = 'success';

  constructor(private multasService: MultasService) { }

  ngOnInit(): void {
    this.loadMultas();
    this.loadLectores();
    this.loadPrestamos();
  }

  loadMultas(): void {
    this.multasService.getMultas().subscribe({
      next: data => {
        this.multas = data;
      },
      error: error => {
        console.error('Error al cargar las multas:', error);
      }
    });
  }

  loadLectores(): void{
    this.multasService.getLectores().subscribe(data => {
      this.lectores = data;
    }, error => {
      console.error('Error al cargar los lectores:', error);
    });
  }

  createLector(form: any): void {
    this.multasService.createLector(form.value).subscribe(response => {
      console.log('Lector registrado:', response);
      this.loadLectores();  // Recargar la lista de lectores para la selección
      form.reset();
    }, error => {
      console.error('Error al registrar el lector:', error);
    });
  }
  

  loadPrestamos(): void {
    this.multasService.getPrestamos().subscribe(data => {
      this.prestamos = data;
    }, error => {
      console.error('Error al cargar los préstamos:', error);
    });
  }

  createPrestamo(form: any): void {
    this.multasService.createPrestamo(form.value).subscribe(response => {
      console.log('Préstamo registrado:', response);
      this.loadPrestamos(); // Recarga la lista de préstamos para la selección
      form.reset();
    }, error => {
      console.error('Error al registrar el préstamo:', error);
    });
  }
  

  selectMulta(multa: any): void {
    this.selectedMulta = { ...multa };
    // Formatea la fecha para que sea compatible con datetime-local
    this.selectedMulta.FechaInicio = this.formatDateTime(this.selectedMulta.FechaInicio);
    this.isEditing = true;
  }

  formatDateTime(dateString: string): string {
    // Crear una nueva fecha a partir del string de fecha ISO
    const date = new Date(dateString);

    // Obtener componentes de la fecha
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2); // Mes se cuenta desde 0
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);

    // Formatear en el estilo yyyy-MM-ddThh:mm
    return `${year}-${month}-${day}T${hours}:${minutes}`;
  }

  createMulta(form: any): void {
    if (form.invalid) {
      this.showAlert('Por favor, complete todos los campos correctamente.', 'error');
      return;
    }

    if (form.value.Monto < 0) {
      this.showAlert('El monto no puede ser negativo.', 'error');
      return;
    }
  
    this.multasService.createMulta(form.value).subscribe({
      next: () => {
        this.loadMultas();
        form.reset();
        this.showAlert('Multa agregada exitosamente', 'success');
      },
      error: error => {
        let errorMessage = 'Error al agregar la multa. ';
        if (error.status === 400) {
          if (error.error && typeof error.error === 'string') {
            errorMessage += error.error;
          } else {
            errorMessage += 'Datos inválidos.';
          }
        } else if (error.status === 500) {
          errorMessage += 'Error interno del servidor.';
        } else {
          errorMessage += 'Error desconocido.';
        }
        this.showAlert(errorMessage, 'error');
      }
    });
  }
  
  updateMulta(): void {
    if (!this.selectedMulta) return;
  
    this.multasService.updateMulta(this.selectedMulta.IdMulta, this.selectedMulta).subscribe({
      next: () => {
        this.showAlert('Multa actualizada exitosamente', 'success');
        this.isEditing = false;
        this.selectedMulta = null;
        this.loadMultas();
      },
      error: error => {
        let errorMessage = 'Error al actualizar la multa. ';
        if (error.status === 400) {
          errorMessage += error.error || 'Datos inválidos.';
        } else if (error.status === 404) {
          errorMessage += 'Multa no encontrada.';
        } else if (error.status === 500) {
          errorMessage += 'Error interno del servidor.';
        } else {
          errorMessage += 'Error desconocido.';
        }
        this.showAlert(errorMessage, 'error');
      }
    });
  }


  deleteMulta(id: number): void {
    this.multasService.deleteMulta(id).subscribe({
      next: () => {
        this.loadMultas();
        this.showAlert('Multa eliminada exitosamente','success');
      },
      error: error => {
        this.showAlert('Error al eliminar la multa:' + (error.message), 'error');
      }
    });
  }

  showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = null;
    }, 3000);
  
}
}


