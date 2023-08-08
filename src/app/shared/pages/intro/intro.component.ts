import {AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import gsap from "gsap";
import {SplitText} from "../../../../assets/text-animation/splitText";
import {circular} from "../../animations/gsap/gsap";
import {TextEnum} from "../../text-enums/text.enum";
import {ObjectUnsubscribedError, toArray} from "rxjs";


@Component({
    selector: 'intro',
    templateUrl: './intro.component.html',
    styleUrls: ['./intro.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntroComponent implements OnInit, AfterViewInit {
    @ViewChild('introCosmoMan', {static: false}) introCosmoMan: ElementRef;
    private readonly textEnum = TextEnum;
    public textSVGs: { name: string, val: string }[] = [];

    ngOnInit(): void {
        this.getSvgText();
    }

    ngAfterViewInit(): void {


        const path: any = document.getElementsByClassName('path');

        const timeline = gsap.timeline();



    }


    private getSvgText(): void {
        this.textSVGs = Object.entries(this.textEnum)
            .map((name: [string, TextEnum]) =>
                Object.assign({name: name[0]}, {val: name[1]}));
    }

    private swingCosmoMan(): void {
        gsap.set(this.introCosmoMan.nativeElement, {
            rotateY: 180
        })
        const swing = gsap.to(this.introCosmoMan.nativeElement, {
            transformOrigin: '50% 0',
            rotateZ: '30deg',
            rotateX: '0deg',
            transformStyle: 'preserve-3d',
            duration: 5,
            ease: 'power1.inOut',
            onUpdate: (): void => {
                circular(swing);
            }
        })
    }
}
