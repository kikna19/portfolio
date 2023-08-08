import {AfterViewInit, Directive, ElementRef, OnInit} from '@angular/core';
import {UntilDestroy} from "@ngneat/until-destroy";
import gsap from "gsap";
import {circular} from "../../animations/gsap/gsap";
import {SplitText} from "../../../../assets/text-animation/splitText";

@UntilDestroy()
@Directive({
    selector: '[textHeaderAnimate]'
})
export class TextHeaderDirective implements OnInit, AfterViewInit {
    private st = new SplitText({words: 1, chars: 1});
    timeline = gsap.timeline();


    constructor(
        private el: ElementRef
    ) {
    }

    ngOnInit(): void {
    }

    ngAfterViewInit() {
        const [p1, p2, p3] = Array.from(this.el.nativeElement.children).map((a:any) => a.children[0]);

        [p1, p2, p3].forEach(path => {
            const length = path.getTotalLength();
            path.style.strokeDasharray = length;
            path.style.strokeDashoffset = length;
        });

        gsap.to(p1, { strokeDashoffset: 0, duration: 2, delay: 0, ease: 'power1.inOut' });
        gsap.to(p2, { strokeDashoffset: 0, duration: 2, delay: 1, ease: 'power1.inOut' });
        gsap.to(p3, { strokeDashoffset: 0, duration: 2, delay: 1.5, ease: 'power1.inOut' });

    }


    private textAnimate(): void {
        const chars = this.st.split([this.el.nativeElement]).chars;
        let randomChar: number;
        let randomChars: Set<number> = new Set<number>([]);
        for (let i = 0; i <= chars.length; i++) {
            randomChar = Math.floor(Math.random() * 13);
            randomChars.add(randomChar)
        }
        randomChars.forEach(i => {
            const jumpText = gsap.to(chars[i], {
                delay: (): number => {
                    return i / 6;
                },
                y: -40,
                onUpdate: (): void => {
                    circular(jumpText)
                }
            })
        })
    }
}
