import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeDeteccaoComponent } from './features/deteccaoDeEsteganografia/home/home.component';
import { HomeEstenografiaComponent } from './features/criacaoEsteganografia/homeEsteganografia/homeEstenografia.component';
import { HomePageComponent } from './features/homePage/homePage.component';

const routes: Routes = [
  { path: 'criarEstenografia', component: HomeEstenografiaComponent },
  { path: 'detectarEstenografia', component: HomeDeteccaoComponent },
  { path: '',pathMatch:'full', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
