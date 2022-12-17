import { Directive, ElementRef, OnInit } from '@angular/core';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';

@Directive({
  selector: 'ol-map'
})
export class OlMapDirective implements OnInit {

  public map?: Map;

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.map = new Map({
      view: new View({
        center: [0, 0],
        zoom: 1,
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });
    this.map.setTarget(this.elementRef.nativeElement);
  }

}
