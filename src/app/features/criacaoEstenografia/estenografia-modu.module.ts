import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeEstenografiaComponent } from './homeEstenografia/homeEstenografia.component';
import { EsteganografiaService } from './Services/esteganografia.service';
import { HttpClientModule } from '@angular/common/http';



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
