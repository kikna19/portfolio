import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoiseComponent } from './shared/animations/noise/noise.component';
import { MainComponent } from './main/main.component';
import { HeaderComponent } from './shared/pages/header/header.component';
import { MyFooterComponent } from './shared/pages/my-footer/my-footer.component';
import {NgOptimizedImage} from "@angular/common";
import { LandingComponent } from './shared/pages/landing/landing.component';
import { TextInitDirective } from './shared/directives/text-init.directive';
import { IntroComponent } from './shared/pages/intro/intro.component';
import { BgComponent } from './shared/animations/bg/bg.component';

@NgModule({
  declarations: [
    AppComponent,
    NoiseComponent,
    MainComponent,
    HeaderComponent,
    MyFooterComponent,
    LandingComponent,
    TextInitDirective,
    IntroComponent,
    BgComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        NgOptimizedImage
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
