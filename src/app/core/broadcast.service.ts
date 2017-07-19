import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject }    from 'rxjs/Subject';
import 'rxjs/add/operator/filter';

@Injectable()
export class BroadcastService {

  private event: Subject<Event> = new Subject<Event>();

  public next(event: Event): void {
    return this.event.next(event);
  }

  public getEvents(event: Event): Observable<Event> {
    // DO NOT SUBSCRIBE HERE. Return the observable.
    return this.event.asObservable()
    // Only keep events matching the given `event` param
        .filter(e => e.type == event.type);
  }
}
