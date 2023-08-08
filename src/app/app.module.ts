import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoiseComponent} from './shared/animations/noise/noise.component';
import {MainComponent} from './main/main.component';
import {HeaderComponent} from './shared/pages/header/header.component';
import {FooterComponent} from './shared/pages/footer/footer.component';
import {NgOptimizedImage} from "@angular/common";
import {LandingComponent} from './shared/pages/landing/landing.component';
import {TextInitDirective} from './shared/directives/text/text-init.directive';
import {IntroComponent} from './shared/pages/intro/intro.component';
import {BgComponent} from './shared/animations/bg/bg.component';
import {TextHeaderDirective} from './shared/directives/text/text-header.directive';
import {TextLetterDirective} from './shared/directives/text/text-letter.directive';

@NgModule({
  declarations: [
    AppComponent,
    NoiseComponent,
    MainComponent,
    HeaderComponent,
    FooterComponent,
    LandingComponent,
    TextInitDirective,
    IntroComponent,
    BgComponent,
    TextHeaderDirective,
    TextLetterDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
