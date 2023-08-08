import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, Output, ViewChild} from '@angular/core';
import gsap from "gsap";
import {SplitText} from "../../../../assets/text-animation/splitText";
import {circular} from "../../animations/gsap/gsap";
import {TextEnum} from "../../entity/text-enums/text.enum";
import {first, mergeMap, ObjectUnsubscribedError, of, Subscription, take, takeLast, tap, toArray} from "rxjs";
import {ScrollService} from "../../service/scroll.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";


@UntilDestroy()
@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
})
export class IntroComponent implements OnInit {
  private readonly textEnum = TextEnum;
  public textSVGs: { name: string, val: string }[] = [];
  public scrollHasDetected: boolean = false;

  constructor(private scrollService: ScrollService) {
  }

  ngOnInit(): void {
    this.scrollService.scroll$.pipe(
      untilDestroyed(this),
      take(2),
    ).subscribe(() => {
      this.scrollHasDetected = true;
      this.swingCosmoMan();
    });
    this.getSvgText();
  }

  private getSvgText(): void {
    this.textSVGs = Object.entries(this.textEnum)
      .map((name: [string, TextEnum]) =>
        Object.assign({name: name[0]}, {val: name[1]}));
  }

  private swingCosmoMan(): void {
    gsap.set('#introCosmoMan', {
      rotateY: 180
    })
    const swing = gsap.to('#introCosmoMan',{
      transformOrigin: '50% 0',
      rotateZ: '30deg',
      rotateX: '0deg',
      transformStyle: 'preserve-3d',
      duration: 5,
      ease: 'power1.inOut',
      onUpdate: (): void => {
        circular(swing);
      }
    })
  }
}
