import { NgModule } from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {MainModule} from './main/main.module';

import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { CookieService } from 'ngx-cookie-service';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {CachingInterceptor} from "./shared/common/caching.interceptor";
import {RequestCache} from "./shared/services/request-cache.service";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "./shared/shared.module";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment.prod';
import {ApplicationStateService} from "./application-state.service";
import {FlexLayoutModule} from "@angular/flex-layout";
import { MatIconModule } from "@angular/material/icon";



@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MainModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatTableModule,
    MatListModule,
    FlexLayoutModule,
    SharedModule,
    environment.production ? ServiceWorkerModule.register('/ngsw-worker.js') : []
  ],
  providers: [RequestCache, { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptor, multi: true },
    CookieService, ApplicationStateService],
  bootstrap: [AppComponent]
})


export class AppModule { }
