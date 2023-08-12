import {AfterViewInit, Component, ComponentRef, ElementRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import gsap from "gsap";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";
import {ScrollTrigger} from "gsap/all";
import {CosmomanComponent} from "../../shared/animations/cosmoman/cosmoman.component";

gsap.registerPlugin(ScrollTrigger);

@UntilDestroy()
@Component({
    selector: 'landing',
    templateUrl: './landing.component.html',
    styleUrls: ['./landing.component.scss']
})
export class LandingComponent {
    @ViewChild('gela') gela: ElementRef;


}
