import {AfterViewInit, Directive, ElementRef} from '@angular/core';
import gsap from "gsap";
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[textLetter]'
})
export class TextLetterDirective implements AfterViewInit {

  constructor(
    private el: ElementRef
  ) {
  }

  ngAfterViewInit(): void {
    const paths: any = Array.from(this.el.nativeElement.children).map((a: any) => a.children[0]);
    paths.forEach((path: any, index: number): void => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = length;
      path.style.strokeDashoffset = length;
      gsap.to(path, {strokeDashoffset: 0, duration: 2, delay: index / 2, ease: 'power1.inOut'});
    });
  }
}
