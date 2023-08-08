import {Directive, ElementRef, OnInit} from '@angular/core';
import gsap from "gsap";
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[textInit]'
})
export class TextInitDirective implements OnInit {

  constructor(
    private el: ElementRef
  ) {
  }

  ngOnInit(): void {
    this.textInit();
  }

  private textInit(): void {
    gsap.fromTo(this.el.nativeElement, {
      y: '200%',
    }, {
      y: '50%',
      transform: 'translate(0, -50%)',
      duration: 1.2,
      ease: 'expo.inOut'
    })
  }

}
