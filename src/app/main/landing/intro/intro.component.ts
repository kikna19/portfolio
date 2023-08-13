import {
  AfterViewInit,
  Component, ComponentRef,
  ElementRef,
  EventEmitter,
  OnInit,
  Output,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {TextEnum} from "../../../shared/entity/text-enums/text.enum";
import {ScrollService} from "../../../shared/services/scroll/scroll.service";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {distinctUntilChanged, filter, finalize, fromEvent, map, take, tap} from "rxjs";
import {CosmomanComponent} from "../../../shared/animations/cosmoman/cosmoman.component";


@UntilDestroy()
@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements OnInit, AfterViewInit {
  @ViewChild('cosmomanElement', {read: ViewContainerRef}) cosmomanElement: ViewContainerRef;
  @ViewChild('introComponent') introComponent: ElementRef;

  private readonly textEnum = TextEnum;
  public textSVGs: { name: string, val: string }[] = [];

  constructor(
    private scrollService: ScrollService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }

  ngOnInit() {
    this.getSvgText();
  }

  ngAfterViewInit(): void {
    const elementOffsetTop: number = this.introComponent.nativeElement.offsetTop;
    this.scrollService.scroll$.pipe(
      untilDestroyed(this),
      map(scrollTop => {
        return scrollTop > elementOffsetTop / 1.5
      }),
      distinctUntilChanged(),
    ).subscribe((passed: boolean): void => {
      passed ?
        this.createDynamicScrollingElement() :
        this.removeDynamicScrollingElement()
    });
  }

  private createDynamicScrollingElement(): void {
    if (!this.cosmomanElement.length) {
      const dynamicElement: ComponentRef<CosmomanComponent> = this.viewContainerRef.createComponent(CosmomanComponent);
      dynamicElement.instance.side = 'right';
      this.cosmomanElement.insert(dynamicElement.hostView);
    }
  }

  private removeDynamicScrollingElement(): void {
    if (this.cosmomanElement.length > 0)
      this.cosmomanElement.remove(0)
  }


  private getSvgText(): void {
    this.textSVGs = Object.entries(this.textEnum)
      .map((name: [string, TextEnum]) =>
        Object.assign({name: name[0]}, {val: name[1]}));
  }
}
