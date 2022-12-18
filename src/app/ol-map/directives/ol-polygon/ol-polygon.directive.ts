import { Directive, Input } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Polygon } from 'ol/geom';
import Style from 'ol/style/Style';

@Directive({
  selector: 'ol-polygon[id]'
})
export class OlPolygonDirective {
  feature: Feature;
  polygon: Polygon;
  @Input() set coordinates(val: Coordinate[]) {
    console.log('coordinates', val);
    this.polygon.setCoordinates([val]);
    this.polygon.transform('EPSG:4326', 'EPSG:3857');
  }

  @Input() set id(val: string) {
    this.feature.setId(val);
  }

  constructor() {
    this.polygon = new Polygon([]);
    this.feature = new Feature(this.polygon);
  }

}
