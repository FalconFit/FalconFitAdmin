import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input() center: google.maps.LatLngLiteral = { lat: 40.73061, lng: -73.935242 };
  @Input() zoom: number = 8;
  @Input() options: google.maps.MapOptions = {
    mapTypeId: 'roadmap',
    disableDefaultUI: true,
  };
  @Input() markers: any[] = [];

  @Output() mapClick = new EventEmitter<google.maps.MapMouseEvent>();

  addMarker(event: google.maps.MapMouseEvent) {
    this.mapClick.emit(event);
  }
}
