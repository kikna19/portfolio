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
    let randomChar: number;
    let randomChars: Set<number> = new Set<number>([]);
    for (let i = 0; i <= chars.length; i++) {
      randomChar = Math.floor(Math.random() * 13);
      randomChars.add(randomChar)
    }
    randomChars.forEach(i => {
      const jumpText = gsap.to(chars[i], {
        delay: (): number => {
          return i / 6;
        },
        y: -40,
        onUpdate: (): void => {
          circular(jumpText)
        }
      })
    })
  }
}
