import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/Paginated.model';
import { Place } from 'src/app/core/models/place.model';
import { PlaceService } from 'src/app/core/services/impl/place.service';
import { MapModuleComponent } from 'src/app/shared/components/map-module/map-module.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  _place:BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([]);
  machine$:Observable<Place[]> = this._place.asObservable();

  page:number = 1;
  pageSize:number = 25;
  pages:number = 0;
  totalPages!: number;

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

  constructor(
    private modalCtrl: ModalController,
    private placeSvc: PlaceService,
  ) {
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

  async onAddPlace(lat: number, lng: number) {
    const modal = await this.modalCtrl.create({
      component:MapModuleComponent,
      componentProps:{
      }
    });

    modal.onDidDismiss().then((data)=>{
      let place:Place = {
        id: '',
        title: data.data.title,
        description: data.data.description,
        lat: lat,
        lng: lng
      }
      this.placeSvc.add(place).subscribe({
        next:(response: Place) => {
          this.refresh();
        }
      });
    });

    return await modal.present();
  }


  // Función para agregar un marcador en el mapa
  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const position = event.latLng.toJSON();
      this.markers.push({ position });
      const posLatitude = position.lat;
      const posLenght = position.lng;

      this.onAddPlace(posLatitude, posLenght)

      console.log("Marcador añadido:", position); // Opcional: Verifica los valores en la consola
    }
  }

  // Función para enfocar el mapa en una ubicación específica
  focusLocation(location: any) {
    this.center = location.position; // Centra el mapa en la ubicación seleccionada
    this.zoom = 18; // Acerca el zoom
  }

  refresh(){
    this.placeSvc.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next:(response:Paginated<Place>)=>{
        this.totalPages = response.pages;
        this._place.next(response.data);
      }
    });
  }
}
