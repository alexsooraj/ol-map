import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapDirective } from './directives/ol-map/ol-map.directive';
import { OlLayerDirective } from './directives/ol-layer/ol-layer.directive';
import { OlFeatureDirective } from './directives/ol-marker/ol-feature.directive';



@NgModule({
  declarations: [
    OlMapDirective,
    OlLayerDirective,
    OlFeatureDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [OlMapDirective, OlLayerDirective, OlFeatureDirective]
})
export class OlMapModule { }
