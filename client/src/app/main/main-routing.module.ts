import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {MainComponent} from "./main.component";
import {HomeComponent} from "./home/home.component";
import {NearEarthObjComponent} from "./home/near-earth-obj/near-earth-obj.component";



const routes: Routes = [
  {
    path:'',
    component: MainComponent,
    children: [
      {path: 'home', component: HomeComponent},
      {path: 'neo', component: NearEarthObjComponent},
      {path: '**', redirectTo: '/home'}
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
  providers: [] // this is where auth guard service will be
})
export class MainRoutingModule {}
