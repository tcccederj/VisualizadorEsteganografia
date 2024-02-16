import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { DeteccaoEstaganografiaService } from './services/deteccaoEstaganografia.service';
import { HomeDeteccaoComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeDeteccaoComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],exports:[
    HomeDeteccaoComponent
  ],
  providers:[
    DeteccaoEstaganografiaService
  ]
})
export class DeteccaoEstenografiaModelModule { }
