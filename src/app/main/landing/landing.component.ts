import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ComponentRef,
  ElementRef,
  OnChanges,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {IntroComponent} from "./intro/intro.component";

@UntilDestroy()
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('introComp') introComp: ElementRef;
  @ViewChild('introCompContent', {read: ViewContainerRef}) introCompContent: ViewContainerRef;

  public introCompOffsetTop: number = 0;

  constructor(
    private cdr: ChangeDetectorRef,
    private viewContainerRef: ViewContainerRef
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.introCompOffsetTop = this.introComp.nativeElement.offsetTop;
    });
  }


  public loadIntoComponent(): void {
    if (!this.introCompContent.length) {
      this.createIntoComp();
      this.cdr.detectChanges();
    }
  }

  private createIntoComp(): void {
    const dynamicElement: ComponentRef<IntroComponent> = this.viewContainerRef.createComponent(IntroComponent);
    this.introCompContent.insert(dynamicElement.hostView);
  }


}
