import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef, EventEmitter, Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {SplitText} from "../../../../assets/text-animation/splitText";
import {CosmomanComponent} from "../../../shared/animations/cosmoman/cosmoman.component";
import gsap from "gsap";
import {ScrollService} from "../../../shared/services/scroll/scroll.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {
  distinctUntilChanged,
  map,
  tap
} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'greeting',
  templateUrl: './greeting.component.html',
  styleUrls: ['./greeting.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GreetingComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('cosmomanElement', {read: ViewContainerRef}) cosmomanElement: ViewContainerRef;
  @ViewChild('msgText', {static: false}) msgText: ElementRef<HTMLParagraphElement>;
  @ViewChild('msgEndText', {static: false}) msgEndText: ElementRef<HTMLSpanElement>;

  @Input() introCompOffsetTop: number = 0;

  @Output() scrollPassed: EventEmitter<void> = new EventEmitter<void>();


  private st = new SplitText({words: 1, chars: 1, spacing: "1rem"});


  constructor(
    private viewContainerRef: ViewContainerRef,
    private scrollService: ScrollService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['introCompOffsetTop'].currentValue)
      this.scrollService.scroll$.pipe(
        untilDestroyed(this),
        tap((scrollTop: number) => {
          if (scrollTop == 0) {
            this.createDynamicScrollingElement();
            this.cdr.markForCheck();
          }
        }),
        map((scrollTop: number): boolean => scrollTop > this.introCompOffsetTop / 2),
        distinctUntilChanged(),
      ).subscribe((passed: boolean): void => {
        if (passed)
          this.removeDynamicScrollingElement();
      });
  }

  ngAfterViewInit() {
    this.createDynamicScrollingElement();
    this.animateText();
  }

  createDynamicScrollingElement(): void {
    const dynamicElement: ComponentRef<CosmomanComponent> = this.viewContainerRef.createComponent(CosmomanComponent);
    this.cosmomanElement.insert(dynamicElement.hostView);
  }

  removeDynamicScrollingElement(): void {
    if (this.cosmomanElement.length > 0)
      this.cosmomanElement.remove(0)
  }

  animateText(): void {
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
}
