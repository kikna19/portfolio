import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {FullIntroComponent} from "./full-intro.component";

const roots: Routes = [
  {
    path: '',
    component: FullIntroComponent
  }
]


@NgModule({
  imports: [
    RouterModule.forChild(roots)
  ],
  exports: [
    RouterModule
  ]
})
export class FullIntroRoutingModule { }
