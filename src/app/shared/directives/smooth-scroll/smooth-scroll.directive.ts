import {Directive, ElementRef, OnInit} from '@angular/core';
import gsap from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {UntilDestroy} from "@ngneat/until-destroy";

@UntilDestroy()
@Directive({
  selector: '[smoothScroll]'
})
export class SmoothScrollDirective implements OnInit{

  constructor(
    private el: ElementRef
  ) { }

  ngOnInit():void {
    this.smoothScroll(this.el.nativeElement)
  }

  smoothScroll(content: any, viewport?: any, smoothness?: any) {
    content = gsap.utils.toArray(content)[0];
    smoothness = smoothness || 1;

    gsap.set(content, {overflow: "visible", width: "100%", position: 'fixed', paddingBottom: '100px'});

    let getProp = gsap.getProperty(content),
      setProp = gsap.quickSetter(content, "y", "px"),
      setScroll = ScrollTrigger.getScrollFunc(window),
      killScrub = (trigger:any) => {
        let scrub = trigger.getTween ? trigger.getTween() : gsap.getTweensOf(trigger.animation)[0]; // getTween() was added in 3.6.2
        scrub && scrub.pause();
        trigger.animation.progress(trigger.progress);
      },
      height: any, isProxyScrolling: any;

    function refreshHeight() {
      height = content.clientHeight;
      content.style.overflow = "visible"
      document.body.style.height = height + "px";
      return height - document.documentElement.clientHeight;
    }


    ScrollTrigger.defaults({scroller: content});
    ScrollTrigger.prototype.update = p => p; // works around an issue in ScrollTrigger 3.6.1 and earlier (fixed in 3.6.2, so this line could be deleted if you're using 3.6.2 or later)

    ScrollTrigger.scrollerProxy(content, {
      scrollTop(value:any) {
        if (arguments.length) {
          isProxyScrolling = true; // otherwise, if snapping was applied (or anything that attempted to SET the scroll proxy's scroll position), we'd set the scroll here which would then (on the next tick) update the content tween/ScrollTrigger which would try to smoothly animate to that new value, thus the scrub tween would impede the progress. So we use this flag to respond accordingly in the ScrollTrigger's onUpdate and effectively force the scrub to its end immediately.
          setProp(-value);
          setScroll(value);
          return;
        }
        return -getProp("y");
      },
      scrollHeight: () => document.body.scrollHeight,
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      }
    });

    return ScrollTrigger.create({
      animation: gsap.fromTo(content, {y:0}, {
        y: () => {
          return document.documentElement.clientHeight - height;
        },
        ease: "none",
        onUpdate: ScrollTrigger.update
      }),
      scroller: window,
      invalidateOnRefresh: true,
      start: 0,
      end: refreshHeight,
      refreshPriority: -999,
      scrub: smoothness,
      onRefresh: killScrub // when the screen resizes, we just want the animation to immediately go to the appropriate spot rather than animating there, so basically kill the scrub.
    });
  }
}
