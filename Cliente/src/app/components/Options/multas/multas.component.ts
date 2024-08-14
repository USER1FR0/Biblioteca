import { Component, OnInit } from '@angular/core';
import { MultasService } from '../Services/multa.service';

@Component({
  selector: 'app-multas',
  templateUrl: './multas.component.html',
  styleUrls: ['./multas.component.css']
})
export class MultasComponent implements OnInit {
  multas: any[] = [];
  selectedMulta: any = null;
  isEditing = false;

  constructor(private multasService: MultasService) { }

  ngOnInit(): void {
    this.loadMultas();
  }

  loadMultas(): void {
    this.multasService.getMultas().subscribe(data => {
      this.multas = data;
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
    this.multasService.createMulta(form.value).subscribe(() => {
      this.loadMultas();
      form.reset();
    });
  }

  updateMulta(): void {
    if (this.selectedMulta) {
      const changes = {
        NumeroControl: this.selectedMulta.NumeroControl,
        Monto: this.selectedMulta.Monto,
        FechaInicio: this.selectedMulta.FechaInicio,
        Estatus: this.selectedMulta.Estatus,
        IdPrestamo: this.selectedMulta.IdPrestamo
      };

      this.multasService.updateMulta(this.selectedMulta.IdMulta, changes).subscribe(
        response => {
          console.log('Multa actualizada:', response);
          this.isEditing = false;
          this.loadMultas(); // Recarga la lista de multas después de la actualización
        },
        error => {
          console.error('Error al actualizar la multa:', error);
        }
      );
    }
  }

  deleteMulta(id: number): void {
    this.multasService.deleteMulta(id).subscribe(() => {
      this.loadMultas();
    });
  }
}


