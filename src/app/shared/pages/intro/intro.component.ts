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
  @ViewChild('introHeader', {static: false}) introHeader: ElementRef<HTMLParagraphElement>;
  @ViewChild('introCosmoMan', {static: false}) introCosmoMan: ElementRef;
  private st = new SplitText({words: 1, chars: 1});

  ngAfterViewInit(): void {
    this.swingCosmoMan();
    this.textAnimate();
  }

  private textAnimate(): void {
    const chars = this.st.split([this.introHeader.nativeElement]).chars;
    let randomChar: number;
    let randomChars: Set<number> = new Set<number>([]);
    for (let i = 0; i <= chars.length; i++) {
      randomChar = Math.floor(Math.random() * 13);
      randomChars.add(randomChar)
    }
    randomChars.forEach(i => {
      const swing = gsap.to(chars[i], {
        delay: (): number => {
          return i / 6;
        },
        y: -40,
        onUpdate: (): void => {
          circular(swing)
        }
      })
    })
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
