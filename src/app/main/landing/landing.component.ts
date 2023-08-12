import {AfterViewInit, ChangeDetectorRef, Component, ElementRef, OnChanges, ViewChild} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import {distinctUntilChanged, Observable, take} from "rxjs";

@UntilDestroy()
@Component({
  selector: 'landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements AfterViewInit {
  @ViewChild('introComp') introComp: ElementRef;

  public introCompOffsetTop: number = 0;
  public scrollPassedGreetingComp: boolean = false;
  public scrollPassed$ = Observable<boolean>;

  constructor(
    private cdr: ChangeDetectorRef,
  ) {

  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.introCompOffsetTop = this.introComp.nativeElement.offsetTop;
    });
  }


}
