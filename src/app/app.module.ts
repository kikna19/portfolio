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
import {LandingComponent} from './main/landing/landing.component';
import {TextInitDirective} from './shared/directives/text/text-init.directive';
import {IntroComponent} from './main/landing/intro/intro.component';
import {BgComponent} from './shared/animations/bg/bg.component';
import {TextHeaderDirective} from './shared/directives/text/text-header.directive';
import {TextLetterDirective} from './shared/directives/text/text-letter.directive';
import {FullIntroModule} from "./shared/pages/full-intro/full-intro.module";
import { SkillsComponent } from './main/landing/skills/skills.component';
import { CosmomanComponent } from './shared/animations/cosmoman/cosmoman.component';
import { GreetingComponent } from './main/landing/greeting/greeting.component';

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
    SkillsComponent,
    CosmomanComponent,
    GreetingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgOptimizedImage,
    FullIntroModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
