import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  OnChanges, OnInit, SimpleChanges,
  ViewChild
} from '@angular/core';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'cosmoman',
  templateUrl: './cosmoman.component.html',
  styleUrls: ['./cosmoman.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CosmomanComponent implements OnInit, AfterViewInit {
  @ViewChild('cosmonaut', {static: false}) cosmonaut: ElementRef<HTMLDivElement>;
  @ViewChild('cosmonautContent', {static: false}) cosmonautContent: ElementRef<HTMLDivElement>;
  @Input() side: string = 'left';
  @Input() scrollHasDetected: boolean = true;

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.animateCosmoManOnInit();
  }


  private animateCosmoManOnInit(): void {
    gsap.set(this.cosmonaut.nativeElement, {
      rotationY: (): string => {
        return this.side === 'left' ? '0' : '180deg'
      }
    })
    gsap.timeline().fromTo(this.cosmonaut.nativeElement,
      {
        opacity: .2,
      }, {
        opacity: .7,
        duration: 1.2,
        ease: 'elastic.inOut(6, .3)',
        repeat: 2,
      }).to(this.cosmonaut.nativeElement, {
      opacity: 1
    })
  }
}
