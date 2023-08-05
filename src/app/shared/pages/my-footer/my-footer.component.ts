import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'my-footer',
  templateUrl: './my-footer.component.html',
  styleUrls: ['./my-footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyFooterComponent {

}
