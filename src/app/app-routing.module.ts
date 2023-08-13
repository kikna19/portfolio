import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MainComponent} from "./main/main.component";
import {LandingComponent} from "./main/landing/landing.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
        component: LandingComponent,
      },
      {
        path:'info',
        loadChildren: () => import('../app/shared/pages/full-intro/full-intro.module').then(m => m.FullIntroModule)
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
