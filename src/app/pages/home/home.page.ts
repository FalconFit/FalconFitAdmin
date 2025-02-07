import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Paginated } from 'src/app/core/models/paginated.model';
import { Place } from 'src/app/core/models/place.model';
import { PlaceService } from 'src/app/core/services/impl/place.service';
import { MapModuleComponent } from 'src/app/shared/components/map-module/map-module.component';

interface LocationMarker {
  position: google.maps.LatLngLiteral;
  title: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  _place: BehaviorSubject<Place[]> = new BehaviorSubject<Place[]>([]);
  place$: Observable<Place[]> = this._place.asObservable();

  page: number = 1;
  pageSize: number = 25;
  pages: number = 0;
  totalPages!: number;

  center: google.maps.LatLngLiteral = { lat: 36.71919368379839, lng: -4.531364206046131 };
  zoom = 18;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
    mapTypeControl: true,
    streetViewControl: false,
    fullscreenControl: true
  };

  markers: LocationMarker[] = [];
  userLocation!: google.maps.LatLngLiteral;

  constructor(
    private modalCtrl: ModalController,
    private placeSvc: PlaceService,
    private alertController: AlertController,
  ) {
    this.getUserLocation();
  }

  getUserLocation() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.center = this.userLocation;
        this.zoom = 14;
      },
      (error) => {
        console.error("Error al obtener la ubicación del usuario", error);
      }
    );
  }

  ngOnInit() {
    this.loadPlaces();

    this._place.subscribe(places => {
      this.markers = places
        .filter(place => place.latitud && place.longitud)
        .map(place => ({
          position: {
            lat: place.latitud as number,
            lng: place.longitud as number
          },
          title: place.title || 'Ubicación sin título'
        }));
    });
  }

  loadPlaces() {
    this.page = 1;
    this.placeSvc.getAll(this.page, this.pageSize).subscribe({
      next: (response: Paginated<Place>) => {
        this._place.next([...response.data]);
        this.page++;
        this.pages = response.pages;
      }
    });
  }

  async onAddPlace(lat: number, lng: number) {
    const modal = await this.modalCtrl.create({
      component: MapModuleComponent,
      componentProps: {}
    });

    modal.onDidDismiss().then((data) => {
      if (data.data) {
        let place: Place = {
          id: '',
          title: data.data.title || 'Nueva ubicación',
          description: data.data.description || '',
          latitud: lat,
          longitud: lng
        }
        this.placeSvc.add(place).subscribe({
          next: (response: Place) => {
            this.refresh();
          }
        });
      }
    });

    return await modal.present();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      const position = event.latLng?.toJSON();
      if (position) {
        this.onAddPlace(position.lat, position.lng);
      }
    }
  }

  focusLocation(location: Place) {
    // Asegurarse de que latitud y longitud existan
    if (location.latitud && location.longitud) {
      this.center = {
        lat: location.latitud as number,
        lng: location.longitud as number
      };
      this.zoom = 15;
    }
  }

  async deleteLocation(location: Place) {
    const alert = await this.alertController.create({
      header: "Eliminar ubicación",
      message: "¿Está seguro de que desea eliminar esta ubicación?",
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminado cancelado');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            console.log('Eliminado confirmado');
            this.placeSvc.delete(location.id).subscribe({
              next:() => {
                this.refresh();
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  refresh() {
    this.placeSvc.getAll(1, (this.page - 1) * this.pageSize).subscribe({
      next: (response: Paginated<Place>) => {
        this.totalPages = response.pages;
        this._place.next(response.data);
      }
    });
  }
}
