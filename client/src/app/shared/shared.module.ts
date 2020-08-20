import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseContextService } from './services/base-context.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {PopoverModule} from "angular-bootstrap-md";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [

  ],
  exports: [

  ],
  providers: [

  ],
  entryComponents: [

  ]

})


export class SharedModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        PopoverModule.forRoot().providers
      ]
    };
  }
}


