import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {
  center = { lat: 40.73061, lng: -73.935242 };
  zoom = 12;
  options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
  };

  markers: any[] = [];

  addMarker(event: google.maps.MapMouseEvent) {
    if (event.latLng) {
      this.markers.push({ position: event.latLng.toJSON() });
    }
  }


}
