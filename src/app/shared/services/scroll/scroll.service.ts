import {Injectable} from '@angular/core';
import {fromEvent, map, mapTo, Observable, Subject} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject: Subject<number> = new Subject<number>();

  constructor() {
    fromEvent(window, 'scroll').pipe(
      untilDestroyed(this),
      map(() => {
        const scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
        return scrollTop;
      })
    ).subscribe(_ => this.scrollSubject.next(_));
  }

  public get scroll$(): Observable<number> {
    return this.scrollSubject.asObservable();
  }
}
