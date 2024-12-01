import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  center: google.maps.LatLngLiteral = { lat: 36.71919368379839, lng: -4.531364206046131 };
  zoom = 18;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap', // Mapa tipo carretera
    disableDefaultUI: true, // Desactivar controles predeterminados del mapa
    mapTypeControl: true, // Habilitar cambio entre tipo de mapa (satélite, híbrido, etc.)
    streetViewControl: false, // Desactivar Street View
    fullscreenControl: true // Desactivar control de pantalla completa
  };
  markers: any[] = [];
  userLocation!: google.maps.LatLngLiteral;

  locations = [
    { name: 'Black Gym', description: 'El mejor gimnasio del mundo.', position: { lat: 36.71919368379839, lng: -4.531364206046131 } },
    { name: 'Belive campanillas', description: 'Gimnasio mas malillo.', position: { lat: 36.73889315897362, lng: -4.54770824595761 } },
    { name: 'Statue of Liberty', description: 'A historic landmark.', position: { lat: 40.689247, lng: -74.044502 } }
  ];

  constructor() {
    this.getUserLocation(); // Llama a la función para obtener la ubicación del usuario
  }

  // Función para obtener la ubicación del usuario
  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.center = this.userLocation; // Centra el mapa en la ubicación del usuario
        this.zoom = 14; // Ajusta el nivel de zoom
      },
      (error) => {
        console.error("Error al obtener la ubicación del usuario", error);
      }
    );
  }

  // Función para agregar un marcador en el mapa
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markers.push({ position: event.latLng.toJSON() });
    }
  }

  // Función para enfocar el mapa en una ubicación específica
  focusLocation(location: any) {
    this.center = location.position; // Centra el mapa en la ubicación seleccionada
    this.zoom = 18; // Acerca el zoom
  }

  // Función para cambiar el tipo de mapa
  changeMapType(mapType: string) {
    switch (mapType) {
      case 'satellite':
        this.options.mapTypeId = google.maps.MapTypeId.SATELLITE;
        break;
      case 'hybrid':
        this.options.mapTypeId = google.maps.MapTypeId.HYBRID;
        break;
      case 'roadmap':
      default:
        this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
        break;
    }
  }
}
