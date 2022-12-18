import { AfterContentInit, ContentChildren, Directive, Input, OnInit, QueryList } from '@angular/core';
import { Feature } from 'ol';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { OlMarkerDirective } from '../ol-marker/ol-marker.directive';
import { OlPolygonDirective } from '../ol-polygon/ol-polygon.directive';

@Directive({
  selector: 'ol-layer'
})
export class OlLayerDirective implements AfterContentInit {

  layer: VectorLayer<VectorSource>;
  private prevMarkers!: Feature[];
  @ContentChildren(OlMarkerDirective) markers!: QueryList<OlMarkerDirective>;

  private prevPolygons!: Feature[];
  @ContentChildren(OlPolygonDirective) polygons!: QueryList<OlPolygonDirective>;

  @Input() set visible(val: boolean) {
    this.layer.setVisible(val);
  }

  constructor() {
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });
    console.log('this.layer', this.layer);
  }

  ngAfterContentInit(): void {
    this.initMarkers();
    this.initPolygons();
  }

  private initMarkers() {
    const markers = this.markers.map(m => m.feature);
    this.prevMarkers = markers;
    this.addFeatures(markers);
    this.markers.changes.subscribe(() => {
      const newMarkers = this.markers.map(f => f.feature);
      const added = newMarkers.filter(x => !this.prevMarkers.includes(x));
      const removed = this.prevMarkers.filter(x => !newMarkers.includes(x));
      this.addFeatures(added);
      this.removeFeatures(removed);
      this.prevMarkers = newMarkers;
    });
  }

  private initPolygons() {
    const polygons = this.polygons.map(p => p.feature);
    this.prevPolygons = polygons;
    this.addFeatures(polygons);
    this.polygons.changes.subscribe(() => {
      const newPolygons = this.polygons.map(p => p.feature);
      const added = newPolygons.filter(x => !this.prevMarkers.includes(x));
      const removed = this.prevPolygons.filter(x => !newPolygons.includes(x));
      this.addFeatures(added);
      this.removeFeatures(removed);
      this.prevPolygons = newPolygons;
    });
  }

  private addFeatures(features: Feature[]) {
    this.layer?.getSource()?.addFeatures(features);
  }

  private removeFeatures(features: Feature[]) {
    for(const feature of features) {
      this.layer?.getSource()?.removeFeature(feature);
    }
  }

}
