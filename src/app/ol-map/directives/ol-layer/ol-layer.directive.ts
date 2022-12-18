import { AfterContentInit, ContentChildren, Directive, Input, OnInit, QueryList } from '@angular/core';
import { Feature } from 'ol';
import Layer from 'ol/layer/Layer';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import { OlFeatureDirective } from '../ol-marker/ol-feature.directive';

@Directive({
  selector: 'ol-layer'
})
export class OlLayerDirective implements AfterContentInit {

  @Input() name!: string;
  layer: VectorLayer<VectorSource>;
  private prevFeatures!: Feature[];
  @ContentChildren(OlFeatureDirective) features!: QueryList<OlFeatureDirective>;

  constructor() {
    this.layer = new VectorLayer({
      source: new VectorSource({
        features: []
      })
    });
    console.log('this.layer', this.layer);
  }

  ngAfterContentInit(): void {
    const features = this.features.map(f => f.feature);
    this.prevFeatures = features;
    this.addFeatures(features);
    this.features.changes.subscribe(() => {
      const newFeatures = this.features.map(f => f.feature);
      const added = newFeatures.filter(x => !this.prevFeatures.includes(x));
      const removed = this.prevFeatures.filter(x => !newFeatures.includes(x));
      this.addFeatures(added);
      this.removeFeatures(removed);
      this.prevFeatures = newFeatures;
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
