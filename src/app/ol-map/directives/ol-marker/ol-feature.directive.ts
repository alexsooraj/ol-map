import { Directive } from '@angular/core';
import { Feature } from 'ol';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Icon from 'ol/style/Icon';
import Style from 'ol/style/Style';

@Directive({
  selector: 'ol-feature'
})
export class OlFeatureDirective {

  feature: Feature;
  constructor() {
    this.feature = new Feature({
      geometry: new Point(fromLonLat([78.9629, 20.5937]))
    });
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
