import { Directive, Input } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

@Directive({
  selector: 'ol-feature[id]'
})
export class OlFeatureDirective {

  style: Style;

  @Input() set coordinate(val: Coordinate) {
    this.feature.setGeometry(new Point(fromLonLat(val)))
  }

  @Input() set id(val: string) {
    this.feature.setId(val);
  }

  @Input() set text(val: string | undefined) {
    val && this.style.getText().setText(val);
  }

  feature: Feature;
  constructor() {
    this.feature = new Feature();
    this.style = this.getStyle();
    this.feature.setStyle(this.style);
  }

  private getStyle() {
    return new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      }),
      text: new Text()
    });
  }
}
