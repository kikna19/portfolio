import {Component} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

}
