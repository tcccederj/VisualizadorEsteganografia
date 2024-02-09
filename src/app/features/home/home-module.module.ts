import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    HomePageComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ],providers:
  [

  ],
  exports:[
    HomePageComponent
  ]
})
export class HomeModuleModule { }
