// src/app/components/export/export.component.ts
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Esta es la nueva línea que necesitas
import { ExportService } from 'src/app/core/services/impl/export.service';

@Component({
  selector: 'app-export',
  standalone: true, // Esta línea convierte tu componente en standalone
  imports: [CommonModule], // Esta línea da acceso a ngClass, ngIf, DatePipe, etc.
  templateUrl: './export.component.html',
  styleUrls: ['./export.component.scss']
})
export class ExportComponent {

  // Estados para controlar la interfaz de usuario
  isExporting = false;
  exportStatus = '';
  lastExportDate: Date | null = null;

  constructor(private exportService: ExportService) {}

  /**
   * Maneja el proceso de exportación con feedback visual para el usuario
   */
  async onExportClick(): Promise<void> {
    // Evitamos múltiples exportaciones simultáneas
    if (this.isExporting) {
      return;
    }

    try {
      // Iniciamos el proceso
      this.isExporting = true;
      this.exportStatus = 'Conectando con la base de datos...';

      // Pequeña pausa para que el usuario vea el mensaje
      await this.delay(500);

      this.exportStatus = 'Obteniendo datos de todas las colecciones...';

      // Ejecutamos la exportación
      await this.exportService.exportAllToCSV();

      // Actualizamos el estado de éxito
      this.exportStatus = '¡Exportación completada exitosamente!';
      this.lastExportDate = new Date();

      // Limpiamos el mensaje después de unos segundos
      setTimeout(() => {
        this.exportStatus = '';
      }, 3000);

    } catch (error) {
      console.error('Error en la exportación:', error);
      this.exportStatus = 'Error durante la exportación. Revisa la consola para más detalles.';

      // Limpiamos el mensaje de error después de unos segundos
      setTimeout(() => {
        this.exportStatus = '';
      }, 5000);

    } finally {
      this.isExporting = false;
    }
  }

  /**
   * Función auxiliar para crear pausas
   * @param ms - Milisegundos a esperar
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
