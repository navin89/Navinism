import {NgModule} from "@angular/core";
import {HttpClientModule} from '@angular/common/http';
import {CommonModule, DatePipe} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {CdkTableModule} from '@angular/cdk/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MainComponent} from "./main.component";
import {HeaderComponent} from "./header/header.component";
import {HomeComponent} from "../home/home.component";
import {MainRoutingModule} from './main-routing.module';
import {MatButtonModule} from "@angular/material/button";
import {MDBBootstrapModule} from "angular-bootstrap-md";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatIconModule} from "@angular/material/icon";
import { NearEarthObjComponent } from './near-earth-obj/near-earth-obj.component';
import {MatTableModule} from "@angular/material/table";

@NgModule({
    imports: [
        MDBBootstrapModule.forRoot(),// watch out for this
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
        MatTableModule
    ],
  declarations: [
    MainComponent,
    HeaderComponent,
    HomeComponent,
    NearEarthObjComponent
  ],

  // look into DatePipe
  providers: [DatePipe],
  entryComponents: [],
  schemas: []
})
export class MainModule {}


