import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { HomeEstenografiaComponent } from './homeEsteganografia/homeEstenografia.component';
import { EsteganografiaService } from './Services/esteganografia.service';


@NgModule({
  declarations: [
    HomeEstenografiaComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule


  ], exports:[

  ],
  providers:[
    EsteganografiaService
  ]
})
export class EstenografiaModuModule { }
