import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OlMapDirective } from './directives/ol-map/ol-map.directive';
import { OlLayerDirective } from './directives/ol-layer/ol-layer.directive';



@NgModule({
  declarations: [
    OlMapDirective,
    OlLayerDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [OlMapDirective, OlLayerDirective]
})
export class OlMapModule { }
