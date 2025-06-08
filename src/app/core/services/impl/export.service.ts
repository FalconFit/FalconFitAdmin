// src/app/services/export.service.ts
import { Inject, Injectable } from '@angular/core';
import {
  Firestore,
  getFirestore,
  collection,
  getDocs,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot
} from "firebase/firestore";
import { FIREBASE_CONFIG_TOKEN } from '../../repositories/repository.tokens';
import { initializeApp } from 'firebase/app';

export interface ExportRow {
  collection: string;
  documentId: string;
  [key: string]: any; // Permite cualquier campo adicional
}

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  private firestore: Firestore;

  constructor(@Inject(FIREBASE_CONFIG_TOKEN) protected firebaseConfig: any) {
    // Inicializamos Firebase y obtenemos la instancia de Firestore
    this.firestore = getFirestore(initializeApp(firebaseConfig));
  }

  /**
   * Obtiene todos los documentos de una colección específica
   * @param collectionName - Nombre de la colección a exportar
   * @returns Promise con array de documentos
   */
  private async getCollectionData(collectionName: string): Promise<ExportRow[]> {
    try {
      console.log(`📡 Obteniendo datos de la colección: ${collectionName}...`);

      // En Firebase v9+, creamos una referencia a la colección usando la función 'collection'
      // Esta función toma dos parámetros: la instancia de Firestore y el nombre de la colección
      const collectionRef = collection(this.firestore, collectionName);

      // Usamos getDocs() para obtener todos los documentos de la colección
      // Esta función retorna un QuerySnapshot que contiene todos los documentos
      const snapshot: QuerySnapshot<DocumentData> = await getDocs(collectionRef);

      // Inicializamos el array que contendrá todos los datos procesados
      const data: ExportRow[] = [];

      // Iteramos sobre cada documento en el snapshot
      // snapshot.docs nos da un array de QueryDocumentSnapshot
      snapshot.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
        // Verificamos que el documento existe (aunque getDocs solo retorna documentos existentes)
        if (doc.exists()) {
          // Extraemos todos los datos del documento usando doc.data()
          const docData = doc.data();

          // Creamos el objeto con la estructura estándar que definimos
          // Incluimos metadatos (colección y ID) junto con todos los campos del documento
          const exportRow: ExportRow = {
            collection: collectionName,     // Identificamos de qué colección viene
            documentId: doc.id,            // ID único del documento
            ...docData                     // Expandimos todos los campos del documento
          };

          data.push(exportRow);
        }
      });

      console.log(`✅ Colección ${collectionName}: ${data.length} documentos obtenidos`);
      return data;

    } catch (error) {
      console.error(`❌ Error obteniendo datos de ${collectionName}:`, error);
      throw error;
    }
  }

  /**
   * Obtiene todos los datos de todas las colecciones
   * @returns Promise con todos los datos combinados
   */
  async getAllData(): Promise<ExportRow[]> {
    console.log('🚀 Iniciando recolección de datos de todas las colecciones...');

    // Lista de todas tus colecciones de Firestore
    const collections = ['exercises', 'machines', 'places', 'supersets', 'userffs'];

    // Array que contendrá todos los datos de todas las colecciones
    const allData: ExportRow[] = [];

    // Procesamos cada colección secuencialmente para evitar sobrecargar Firestore
    // Esto también nos permite manejar errores individualmente por colección
    for (const collectionName of collections) {
      try {
        console.log(`🔄 Procesando colección: ${collectionName}`);

        const collectionData = await this.getCollectionData(collectionName);

        // Usamos el operador spread para añadir todos los elementos de una vez
        allData.push(...collectionData);

        // Pequeña pausa entre colecciones para ser amables con Firestore
        await this.delay(100);

      } catch (error) {
        console.error(`❌ Error procesando colección ${collectionName}:`, error);
        // Continuamos con las otras colecciones aunque una falle
        // Esto es importante para no perder todos los datos por un error en una colección
      }
    }

    console.log(`🎉 Total de documentos obtenidos: ${allData.length}`);
    return allData;
  }

  /**
   * Función auxiliar para crear pausas entre operaciones
   * @param ms - Milisegundos a esperar
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Convierte los datos a formato CSV
   * @param data - Array de datos a convertir
   * @returns String con el contenido CSV
   */
  convertToCSV(data: ExportRow[]): string {
    if (data.length === 0) {
      console.warn('⚠️ No hay datos para convertir a CSV');
      return '';
    }

    console.log('🔄 Analizando estructura de datos para crear headers CSV...');

    // Obtenemos todas las claves únicas de todos los objetos
    // Esto es crucial porque diferentes colecciones pueden tener campos diferentes
    // Por ejemplo, 'exercises' puede tener 'machineId' pero 'places' no
    const allKeys = new Set<string>();

    data.forEach(row => {
      Object.keys(row).forEach(key => allKeys.add(key));
    });

    // Convertimos el Set a Array y lo ordenamos para que sea consistente
    // Ponemos 'collection' y 'documentId' al principio para mejor legibilidad
    const headers = Array.from(allKeys).sort((a, b) => {
      if (a === 'collection') return -1;
      if (b === 'collection') return 1;
      if (a === 'documentId') return -1;
      if (b === 'documentId') return 1;
      return a.localeCompare(b);
    });

    console.log(`📋 Headers identificados: ${headers.length} columnas`);

    // Creamos la primera línea con los headers
    // Envolvemos cada header en comillas para manejar nombres con espacios o caracteres especiales
    const csvHeaders = headers.map(header => `"${header}"`).join(',');

    console.log('🔄 Procesando filas de datos...');

    // Creamos las filas de datos
    const csvRows = data.map((row, index) => {
      // Mostramos progreso cada 100 filas procesadas
      if (index % 100 === 0 && index > 0) {
        console.log(`📊 Procesadas ${index} de ${data.length} filas...`);
      }

      return headers.map(header => {
        const value = row[header];

        // Manejamos diferentes tipos de datos cuidadosamente
        if (value === null || value === undefined) {
          return '""';
        }

        // Si es un objeto o array, lo convertimos a JSON string
        // Esto preserva estructuras complejas como arrays de IDs o objetos anidados
        if (typeof value === 'object') {
          const jsonString = JSON.stringify(value);
          // Escapamos las comillas dobles duplicándolas (estándar CSV)
          return `"${jsonString.replace(/"/g, '""')}"`;
        }

        // Si es string, escapamos las comillas dobles
        if (typeof value === 'string') {
          return `"${value.replace(/"/g, '""')}"`;
        }

        // Para números y booleanos, los convertimos a string
        return `"${value}"`;
      }).join(',');
    });

    console.log('✅ Conversión a CSV completada');

    // Combinamos headers y filas con saltos de línea
    return [csvHeaders, ...csvRows].join('\n');
  }

  /**
   * Descarga el CSV como archivo
   * @param csvContent - Contenido del CSV
   * @param filename - Nombre del archivo
   */
  downloadCSV(csvContent: string, filename: string = 'firestore-export.csv'): void {
    console.log(`📥 Preparando descarga del archivo: ${filename}`);

    // Creamos un Blob con el contenido CSV
    // Especificamos el charset UTF-8 para manejar caracteres especiales correctamente
    const blob = new Blob([csvContent], {
      type: 'text/csv;charset=utf-8;'
    });

    // Creamos un enlace temporal para la descarga
    const link = document.createElement('a');

    // Verificamos si el navegador soporta la API de descarga
    if (link.download !== undefined) {
      // Creamos una URL temporal para el blob
      const url = URL.createObjectURL(blob);

      // Configuramos el enlace
      link.setAttribute('href', url);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';

      // Añadimos el enlace al DOM, lo clicamos y lo removemos
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Liberamos la memoria del URL objeto
      URL.revokeObjectURL(url);

      console.log('✅ Descarga iniciada correctamente');
    } else {
      // Fallback para navegadores más antiguos
      console.error('❌ Tu navegador no soporta la descarga automática de archivos');
      alert('Tu navegador no soporta la descarga automática. Por favor, actualiza tu navegador.');
    }
  }

  /**
   * Función principal que ejecuta todo el proceso de exportación
   */
  async exportAllToCSV(): Promise<void> {
    try {
      console.log('🚀 Iniciando proceso completo de exportación...');

      // Paso 1: Obtenemos todos los datos de todas las colecciones
      const allData = await this.getAllData();

      // Verificamos que tengamos datos para exportar
      if (allData.length === 0) {
        console.warn('⚠️ No se encontraron datos para exportar');
        alert('No se encontraron datos en la base de datos para exportar.');
        return;
      }

      console.log(`📊 Datos recolectados: ${allData.length} documentos total`);

      // Paso 2: Convertimos todos los datos a formato CSV
      console.log('🔄 Convirtiendo datos a formato CSV...');
      const csvContent = this.convertToCSV(allData);

      // Verificamos que la conversión fue exitosa
      if (!csvContent) {
        throw new Error('Error en la conversión a CSV: contenido vacío');
      }

      // Paso 3: Generamos un nombre de archivo único con timestamp
      const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
      const filename = `firestore-export-${timestamp}.csv`;

      // Paso 4: Descargamos el archivo
      this.downloadCSV(csvContent, filename);

      console.log(`🎉 Exportación completada exitosamente: ${filename}`);

    } catch (error) {
      console.error('❌ Error durante la exportación:', error);

      // Proporcionamos feedback específico al usuario
      if (error instanceof Error) {
        alert(`Error durante la exportación: ${error.message}`);
      } else {
        alert('Error desconocido durante la exportación. Revisa la consola para más detalles.');
      }

      throw error;
    }
  }
}
