import { HomePageComponent } from './features/home/home-page/home-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeEstenografiaComponent } from './features/criacaoEstenografia/homeEstenografia/homeEstenografia.component';

const routes: Routes = [
  { path: 'homeValidacaoEstenografia', component: HomePageComponent },
  { path: 'criacaoEstenografia', component: HomeEstenografiaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
