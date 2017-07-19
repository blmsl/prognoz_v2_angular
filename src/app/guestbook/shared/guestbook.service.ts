import { Injectable }                           from '@angular/core';
import { Http, URLSearchParams }                from '@angular/http';
import { Observable }                           from 'rxjs/Observable';

import { environment }                          from '../../../environments/environment';
import { ErrorHandlerService }                  from '../../core/error-handler.service';
import { GuestbookMessage }                     from '../../shared/models/guestbook-message.model';
import { HeadersWithToken }                     from '../../core/headers-with-token.service';

@Injectable()

export class GuestbookService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}

    private guestbookUrl = environment.apiUrl + 'guestbookmessages';

    /**
     * Get all paginated guestbook messages
     * @param page
     * @returns {Observable<any>}
     */
    getGuestbookMessages(page: number = 1): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page.toString());
        return this.http
            .get(this.guestbookUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create guestbook message
     * @param message
     * @returns {Observable<GuestbookMessage>}
     */
    createGuestbookMessage(message: GuestbookMessage): Observable<GuestbookMessage> {
        return this.headersWithToken
            .post(this.guestbookUrl, message)
            .map(response => response.json().guestbookMessage)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update guestbook message
     * @param message
     * @returns {Observable<GuestbookMessage>}
     */
    updateGuestbookMessage(message: GuestbookMessage): Observable<GuestbookMessage> {
        return this.headersWithToken
            .put(`${this.guestbookUrl}/${message.id}`, message)
            .map(response => response.json().guestbookMessage)
            .catch(this.errorHandlerService.handle);
    }
}