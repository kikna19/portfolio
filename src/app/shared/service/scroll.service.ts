import {Injectable} from '@angular/core';
import {fromEvent, Observable, Subject} from "rxjs";
import {UntilDestroy, untilDestroyed} from "@ngneat/until-destroy";

@UntilDestroy()
@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  private scrollSubject: Subject<void> = new Subject<void>();

  constructor() {
    fromEvent(window, 'scroll').pipe(
      untilDestroyed(this)
    ).subscribe(() =>
      this.scrollSubject.next()
    );
  }

  public get scroll$(): Observable<void> {
    return this.scrollSubject.asObservable();
  }
}
