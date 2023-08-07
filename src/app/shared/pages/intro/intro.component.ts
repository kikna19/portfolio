import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild} from '@angular/core';
import gsap from "gsap";
import {SplitText} from "../../../../assets/text-animation/splitText";
import {circular} from "../../animations/gsap/gsap";

@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements AfterViewInit {
  @ViewChild('introCosmoMan', {static: false}) introCosmoMan: ElementRef;


  ngAfterViewInit(): void {
    this.swingCosmoMan();
  }

  private swingCosmoMan(): void {
    gsap.set(this.introCosmoMan.nativeElement, {
      rotateY: 180
    })
    const swing = gsap.to(this.introCosmoMan.nativeElement, {
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
