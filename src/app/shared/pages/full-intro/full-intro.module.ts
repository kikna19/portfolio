import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullIntroComponent } from './full-intro.component';
import {FullIntroRoutingModule} from "./full-intro-routing.module";


@NgModule({
  declarations: [
    FullIntroComponent
  ],
  imports: [
    CommonModule,
    FullIntroRoutingModule
  ]
})
export class FullIntroModule { }
