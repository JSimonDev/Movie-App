import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagenPipe } from './imagen.pipe';
import { ParesPipe } from './pares.pipe';
import { VideoPipe } from './video.pipe';



@NgModule({
  declarations: [
    ImagenPipe,
    ParesPipe,
    VideoPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagenPipe,
    ParesPipe,
    VideoPipe
  ]
})
export class PipesModule { }
