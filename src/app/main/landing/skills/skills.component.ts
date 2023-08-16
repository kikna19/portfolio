import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import gsap from "gsap";

@Component({
  selector: 'skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements AfterViewInit {

  @ViewChildren('card') cards: QueryList<ElementRef>;

  cardss = [
    {header: 'rxjs'},
    {header: 'ts'},
    {header: 'js'},
    {header: 'angular'},
  ]


  ngAfterViewInit() {

  }

  animate(index: number) {
    gsap.timeline().to(this.cards.get(index)?.nativeElement, {
      transformOrigin: "-500% 50% -100px",
      rotationZ: -5,
      perspective: 400,
      autoAlpha: 1,
    }).to(this.cards.get(index)?.nativeElement, {
      transformOrigin: "-400% 50%  -80px",
      rotationZ: 1,
      scaleZ: 2,
      perspective: 100,
      zIndex: '-1',
      onComplete: () => {
        if (index == 0)
          this.cards.forEach(el => {
            gsap.set(el.nativeElement, {zIndex: 0})
          })
      }
    });

  }

}
