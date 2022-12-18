import { AfterViewInit, Directive, Input, OnInit } from '@angular/core';
import { Feature } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { Point, Polygon } from 'ol/geom';
import { fromLonLat } from 'ol/proj';
import Fill from 'ol/style/Fill';
import Icon from 'ol/style/Icon';
import Stroke from 'ol/style/Stroke';
import Style from 'ol/style/Style';
import Text from 'ol/style/Text';

@Directive({
  selector: 'ol-marker[id]'
})
export class OlMarkerDirective implements OnInit {

  style!: Style;

  @Input() set coordinate(val: Coordinate) {
    this.feature.setGeometry(new Point(fromLonLat(val)))
  }

  @Input() set id(val: string) {
    this.feature.setId(val);
  }

  @Input() set coordinates(val: Coordinate[]) {
    const polygon = new Polygon([val]);
    polygon.transform('EPSG:4326', 'EPSG:3857');
    this.feature = new Feature(polygon);
  }

  private _text?: string
  @Input() set text(val: string | undefined) {
    this._text = val;
    val && this.style.getText().setText(val);
  }
  get text() {
    return this._text;
  }

  feature: Feature;
  constructor() {
    this.feature = new Feature();
    this.style = this.getDefaultStyle();
    this.feature.setStyle(this.style);
  }
  
  ngOnInit(): void {
    this.style = this.getIconStyle();
    this.feature.setStyle(this.style);
  }

  private getDefaultStyle() {
    return new Style({
      text: new Text()
    });
  }

  private getIconStyle() {
    return new Style({
      image: new Icon({
        anchor: [0.5, 46],
        anchorXUnits: 'fraction',
        anchorYUnits: 'pixels',
        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
      }),
      text: new Text({
        text: this.text
      })
    });
  }
}
