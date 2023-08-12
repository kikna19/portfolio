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
import {filter, finalize, fromEvent, take} from "rxjs";
import {CosmomanComponent} from "../../../shared/animations/cosmoman/cosmoman.component";


@UntilDestroy()
@Component({
  selector: 'intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent implements AfterViewInit {
  @ViewChild('cosmomanElement', {read: ViewContainerRef}) cosmomanElement: ViewContainerRef;
  @ViewChild('mainElement') mainElement: ElementRef;


  private readonly textEnum = TextEnum;
  public textSVGs: { name: string, val: string }[] = [];
  public scrollHasDetected: boolean = false;

  constructor(
    private scrollService: ScrollService,
    private viewContainerRef: ViewContainerRef,
  ) {
  }


  ngAfterViewInit(): void {
    const elementOffsetTop: number = this.mainElement.nativeElement.offsetTop;
    this.scrollService.scroll$.pipe(
      untilDestroyed(this),
      filter(scrollTop => scrollTop > elementOffsetTop),
      take(1)
    ).subscribe((_: any) => {
      this.scrollHasDetected = true;
      this.createDynamicScrollingElement();
    });
    this.getSvgText();
  }

  createDynamicScrollingElement(): void {
    const dynamicElement: ComponentRef<CosmomanComponent> = this.viewContainerRef.createComponent(CosmomanComponent);
    dynamicElement.instance.side = 'right';
    this.cosmomanElement.insert(dynamicElement.hostView);
  }


  private getSvgText(): void {
    this.textSVGs = Object.entries(this.textEnum)
      .map((name: [string, TextEnum]) =>
        Object.assign({name: name[0]}, {val: name[1]}));
  }
}
