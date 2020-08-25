import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MainComponent} from "./main.component";
import {HeaderComponent} from "../header/header.component";
import {HomeComponent} from "./home/home.component";
import {MainRoutingModule} from './main-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {PodComponent} from "./home/pod/pod.component";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {NearEarthObjComponent} from "./home/near-earth-obj/near-earth-obj.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {FlexLayoutModule} from "@angular/flex-layout";


@NgModule({
  imports: [
    MDBBootstrapModule.forRoot(),
    MatDialogModule,
    DragDropModule,
    CdkTableModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    CommonModule,
    HttpClientModule,
    MainRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule,
    MatTooltipModule,
    MatIconModule,
    MatTableModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatListModule,
    FlexLayoutModule
  ],
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    PodComponent,
    NearEarthObjComponent,
  ],

  // look into DatePipe
  providers: [DatePipe],
  entryComponents: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule {}


