import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';
import gsap from "gsap";
import {UntilDestroy} from "@ngneat/until-destroy";
import {SplitText} from "../../../../assets/text-animation/splitText";
import {ScrollTrigger} from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

@UntilDestroy()
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('main', {static: true}) main: ElementRef<HTMLDivElement>;
  @ViewChild('cosmonaut', {static: false}) cosmonaut: ElementRef<HTMLDivElement>;
  @ViewChild('cosmonautContent', {static: false}) cosmonautContent: ElementRef<HTMLDivElement>;
  @ViewChild('msgText', {static: false}) msgText: ElementRef<HTMLParagraphElement>;
  @ViewChild('msgEndText', {static: false}) msgEndText: ElementRef<HTMLSpanElement>;
  private st = new SplitText({words: 1, chars: 1, spacing: "1rem"});

  ngAfterViewInit(): void {
    // this.animateCosmoMan();
    // this.animateText();
    this.zoomInAnimation();
  }

  private animateCosmoMan(): void {
    const baseAnim = {
      duration: 4,
      ease: 'none',
      repeat: -1,
    }
    gsap.to(this.cosmonaut.nativeElement, {
      transformOrigin: "center 303px 303px",
      rotation: '360',
      ...baseAnim,
    },)
    gsap.to(this.cosmonautContent.nativeElement, {
      rotation: '-360',
      ...baseAnim
    },)
  }

  private animateText(): void {
    gsap.fromTo(this.st.split([this.msgText.nativeElement]).chars,
      {
        opacity: 0,
      },
      {
        duration: .5,
        opacity: 1,
        stagger: .07,
        ease: "power1.out",
        onComplete: () => {
          gsap.to(this.msgEndText.nativeElement, {
            visibility: 'visible',
            opacity: 1,
          })
        }
      },
    )
  }

  private zoomInAnimation(): void {
    gsap.to([
      this.main.nativeElement,
    ], {
      scrollTrigger: {
        trigger: this.main.nativeElement,
        markers: {
          startColor: 'transparent',
          endColor: 'transparent'
        },
        pin: true,
        start: 10,
        end: '+=1000',
        scrub: true,
      },
      scale: '+=2',
      opacity: 0,
    })
  }

}
