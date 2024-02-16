import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { HomePageComponent } from './features/homePage/homePage.component';
import { DeteccaoEstenografiaModelModule } from './features/deteccaoDeEsteganografia/deteccao-esteganografia-model.module';
import { EstenografiaModuModule } from './features/criacaoEsteganografia/esteganografia-modu.module';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DeteccaoEstenografiaModelModule,
    EstenografiaModuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
