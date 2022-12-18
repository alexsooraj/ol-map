import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapDirective } from './directives/ol-map/ol-map.directive';
import { OlLayerDirective } from './directives/ol-layer/ol-layer.directive';
import { OlMarkerDirective } from './directives/ol-marker/ol-marker.directive';
import { OlPolygonDirective } from './directives/ol-polygon/ol-polygon.directive';



@NgModule({
  declarations: [
    OlMapDirective,
    OlLayerDirective,
    OlMarkerDirective,
    OlPolygonDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [OlMapDirective, OlLayerDirective, OlMarkerDirective, OlPolygonDirective]
})
export class OlMapModule { }
