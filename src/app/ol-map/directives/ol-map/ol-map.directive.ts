import { AfterContentInit, ContentChildren, Directive, ElementRef, OnInit, QueryList } from '@angular/core';
import { Map, View } from 'ol';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { OlLayerDirective } from '../ol-layer/ol-layer.directive';

@Directive({
  selector: 'ol-map'
})
export class OlMapDirective implements OnInit, AfterContentInit {

  public map?: Map;
  private prevLayers!: VectorLayer<VectorSource>[];
  @ContentChildren(OlLayerDirective) layers!: QueryList<OlLayerDirective>;

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

  ngAfterContentInit() {
    const layers = this.layers.map(l => l.layer);
    this.prevLayers = layers;
    this.addLayers(layers);
    this.layers.changes.subscribe(() => {
      const newLayers = this.layers.map(l => l.layer);
      const added = newLayers.filter(x => !this.prevLayers.includes(x));
      const removed = this.prevLayers.filter(x => !newLayers.includes(x));
      this.addLayers(added);
      this.removeLayers(removed);
      this.prevLayers = newLayers;
    });
  }

  private addLayers(layers: Layer[]) {
    for(const layer of layers) {
      this.map?.addLayer(layer);
    }
  }

  private removeLayers(layers: Layer[]) {
    for(const layer of layers) {
      this.map?.removeLayer(layer);
    }
  }

}
