import { Injectable }                           from '@angular/core';
import { Http, URLSearchParams }                from '@angular/http';
import { Observable }                           from 'rxjs/Observable';

import { ErrorHandlerService }                  from '../../shared/error-handler.service';
import { HeadersWithToken }                     from '../../shared/headers-with-token.service';
import { GuestbookMessage }                     from '../../shared/models/guestbook-message.model';
import { environment }                          from '../../../environments/environment';

@Injectable()

export class GuestbookService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private guestbookUrl = environment.API_URL + 'guestbookmessages';

    /**
     * Get all guestbook messages of one page
     * @param page
     * @returns {Observable<R>}
     */
    getGuestbookMessages(page = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http.get(this.guestbookUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create guestbook message
     * @param message
     * @returns {Observable<R>}
     */
    create(message: {user_id: number, body: string}): Observable<any> {
        return this.headersWithToken
            .post(this.guestbookUrl, message)
            .map(response => response.json().guestbookMessages)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update guestbook message
     * @param message
     * @returns {Observable<R|T>}
     */
    update(message: GuestbookMessage): Observable<GuestbookMessage> {
        const url = `${this.guestbookUrl}/${message.id}`;
        return this.headersWithToken
            .put(url, message)
            .map(response => response.json().guestbookMessage)
            .catch(this.errorHandlerService.handle);
    }
}