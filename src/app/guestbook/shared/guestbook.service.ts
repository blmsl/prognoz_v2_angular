import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from '../../../environments/environment';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { GuestbookMessage } from '../../shared/models/guestbook-message.model';
import { HeadersWithToken } from '../../core/headers-with-token.service';

@Injectable()

export class GuestbookService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private httpClient: HttpClient
    ) {}

    private guestbookUrl = environment.apiUrl + 'guestbookmessages';

    /**
     * Get all paginated guestbook messages
     * @param page
     * @returns {Observable<any>}
     */
    getGuestbookMessages(page: number = 1): Observable<any> {
        let params: HttpParams = new HttpParams();
        params = params.append('page', page.toString());
        return this.httpClient
            .get(this.guestbookUrl, {params: params})
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
            .map(response => response['guestbookMessage'])
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
            .map(response => response['guestbookMessage'])
            .catch(this.errorHandlerService.handle);
    }
}