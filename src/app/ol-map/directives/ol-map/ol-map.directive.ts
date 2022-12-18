import { AfterContentInit, ContentChildren, Directive, ElementRef, Input, OnInit, QueryList } from '@angular/core';
import { Map, View } from 'ol';
import { Coordinate } from 'ol/coordinate';
import { boundingExtent } from 'ol/extent';
import Layer from 'ol/layer/Layer';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import { transformExtent } from 'ol/proj';
import OSM from 'ol/source/OSM';
import VectorSource from 'ol/source/Vector';
import { OlLayerDirective } from '../ol-layer/ol-layer.directive';
import { easeOut } from 'ol/easing';

@Directive({
  selector: 'ol-map'
})
export class OlMapDirective implements OnInit, AfterContentInit {

  public map?: Map;
  private prevLayers!: VectorLayer<VectorSource>[];
  @ContentChildren(OlLayerDirective) layers!: QueryList<OlLayerDirective>;

  private _zoom = 1;
  @Input() set zoom(val: number) {
    console.log('zoom', val);
    this._zoom = val;
    this.map?.getView().animate({
      zoom: val
    });
  }
  get zoom() {
    return this._zoom;
  }

  @Input() set viewCorners(val: Coordinate[] | undefined) {
    val && this.panTo(val);
  }

  constructor(private elementRef: ElementRef) { }

  ngOnInit(): void {
    this.initMap();
  }

  private initMap() {
    this.map = new Map({
      view: new View({
        center: [0, 0],
      }),
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
    });
    this.map.setTarget(this.elementRef.nativeElement);

    this.map.getView().setZoom(this._zoom);
  }

  panTo(corners: Coordinate[]) {
    let extent = boundingExtent(corners);
    extent = transformExtent(extent, 'EPSG:4326', 'EPSG:3857');
    this.map?.getView().fit(extent, { duration: 5000, easing: easeOut })
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
