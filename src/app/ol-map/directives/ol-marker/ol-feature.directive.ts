import { Directive, Input } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

@Directive({
  selector: 'ol-feature'
})
export class OlFeatureDirective {

  @Input() set coordinate(val: Coordinate) {
    this.feature.setGeometry(new Point(fromLonLat(val)))
  }

  feature: Feature;
  constructor() {
    this.feature = new Feature();
    this.feature.setStyle(this.getStyle());
  }

  private getStyle() {
    return new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      }),
    });
  }

}
