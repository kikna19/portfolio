import {
    AfterViewInit,
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component,
    ComponentRef,
    ElementRef,
    OnInit,
    ViewChild,
    ViewContainerRef
} from '@angular/core';
import {SplitText} from "../../../../assets/text-animation/splitText";
import {CosmomanComponent} from "../../../shared/animations/cosmoman/cosmoman.component";
import gsap from "gsap";

@Component({
    selector: 'greeting',
    templateUrl: './greeting.component.html',
    styleUrls: ['./greeting.component.scss'],
})
export class GreetingComponent implements OnInit, AfterViewInit {
    @ViewChild('cosmomanElement', {read: ViewContainerRef}) cosmomanElement: ViewContainerRef;
    @ViewChild('msgText', {static: false}) msgText: ElementRef<HTMLParagraphElement>;
    @ViewChild('msgEndText', {static: false}) msgEndText: ElementRef<HTMLSpanElement>;
    private st = new SplitText({words: 1, chars: 1, spacing: "1rem"});


    constructor(
        private viewContainerRef: ViewContainerRef,
    ) {
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.createDynamicScrollingElement();
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
