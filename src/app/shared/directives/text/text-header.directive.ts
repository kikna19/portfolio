import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import gsap from "gsap";
import {circular} from "../../animations/gsap/gsap";
import {SplitText} from "../../../../assets/text-animation/splitText";

@UntilDestroy()
@Directive({
  selector: '[textHeaderAnimate]'
})
export class TextHeaderDirective implements OnInit {
  private st = new SplitText({words: 1, chars: 1});


  constructor(
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.textAnimate();
  }

  private textAnimate(): void {
    const chars: Node[] = this.st.split([this.el.nativeElement]).chars;
    const randomChars = Array.from({length: chars.length}, (_, i) => i);

    for (let i = randomChars.length; i > 0; i--) {
      const j = Math.floor(Math.random() * i + 1);
      [randomChars[i], randomChars[j]] = [randomChars[j], randomChars[i]]
    }

    randomChars.forEach(i => {
      const jumpText = gsap.to(chars[i], {
        delay: (): number => {
          return i / 4;
        },
        y: -15,
        onUpdate: (): void => {
          circular(jumpText)
        },
        ease: 'sine.inOut'
      })
    })
  }
}
