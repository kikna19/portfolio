import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'bg',
  templateUrl: './bg.component.html',
  styleUrls: ['./bg.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BgComponent {

}
