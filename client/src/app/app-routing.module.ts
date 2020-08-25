import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router, PreloadAllModules} from '@angular/router';
import {MainComponent} from "./main/main.component";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {



}
