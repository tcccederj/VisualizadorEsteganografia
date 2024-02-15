import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeModuleModule } from './features/home/home-module.module';
import { EstenografiaModuModule } from './features/criacaoEstenografia/estenografia-modu.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HomeModuleModule,
    HttpClientModule,
    EstenografiaModuModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
