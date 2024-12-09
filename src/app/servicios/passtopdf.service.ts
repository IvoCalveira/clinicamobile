import { Injectable } from '@angular/core';
import { Usuario } from '../clases/usuario';
import { jsPDF } from 'jspdf';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { FileOpener } from '@awesome-cordova-plugins/file-opener/ngx';

@Injectable({
  providedIn: 'root', // Aquí ya está disponible como servicio global
})
export class PasstopdfService {
  constructor(private fileOpener: FileOpener) {}

  async listamedPDF(medicos: Usuario[]) {
    try {
      console.log('Generando el PDF con la lista de médicos:', medicos);
      // Crear el documento PDF
      const pdf = new jsPDF();

      // Agregar título
      pdf.setFontSize(22);
      pdf.text('Lista de Médicos', 20, 20);

      // Configuración de estilo de texto
      pdf.setFontSize(16);
      pdf.setFont('helvetica', 'normal');

      // Generar la lista de médicos
      let yOffset = 40;
      medicos.forEach((medico, index) => {
        pdf.text(`${index + 1}. ${medico.nombre} - ${medico.especialidad}`, 20, yOffset);
        yOffset += 10;
      });

      // Convertir el PDF a base64
      const pdfOutput = pdf.output('datauristring');
      const base64PDF = pdfOutput.split(',')[1];

      // Guardar el archivo en el dispositivo
      const fileName = 'ListaMedicos.pdf';
      const result = await Filesystem.writeFile({
        path: fileName,
        data: base64PDF,
        directory: Directory.Documents,
      });

      console.log('PDF guardado en:', result.uri);

      // Abrir el PDF con el visor nativo
      this.fileOpener
        .open(result.uri, 'application/pdf')
        .then(() => console.log('Archivo abierto con éxito'))
        .catch((error) => console.error('Error al abrir el archivo:', error));
    } catch (error) {
      console.error('Error al generar el PDF:', error);
    }
  }
}
