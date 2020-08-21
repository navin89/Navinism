import { NgModule } from '@angular/core';
import {Routes, RouterModule, Router, PreloadAllModules} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {ApplicationStateService} from "./application-state.service";

const routes: Routes = [
  {
    path: 'main',
    component: MainComponent
  }
];

const mobile_routes: Routes = [
  // {path: '', component: MobileFrontpageComponent},
  // {path: 'products/:productName', component: ProductComponentMobile},
  // {path: 'about', component: AboutComponent},
  // {path: 'user-profile', component: UserProfileComponent},
  // // directs all other routes to the main page
  // {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {

  public constructor(private router:Router, private applicationStateService: ApplicationStateService) {
    if(applicationStateService.getIsMobileResolution()) {
      router.resetConfig(mobile_routes);
    }
  }





}
