import { Injectable }                           from '@angular/core';
import { Http, Response, URLSearchParams }      from '@angular/http';
import { Observable }                           from 'rxjs/Observable';

import { API_URL }                              from '../shared/app.settings';
import { HeadersWithToken }                     from '../shared/headers-with-token.service';

@Injectable()

export class GuestbookService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private guestbookUrl = API_URL + 'guestbookmessage';

    /**
     * Get all guestbook messages of one page
     *
     * @param page
     * @returns {Observable<R>}
     */
    getGuestbookMessages(page = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http.get(this.guestbookUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Create guestbook message
     *
     * @param message
     * @returns {Observable<R>}
     */
    create(message: {user_id: number, body: string}): Observable<any> {
        return this.headersWithToken
            .post(this.guestbookUrl, message)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Transforms to json
     *
     * @param res
     * @returns {any}
     */
    private extractData(res: Response) {
        if (res && res.status !== 204) {
            let body = res.json();
            if (body.guestbookMessages) body = body.guestbookMessages;
            return body || {};
        }

        return res;
    }

    /**
     * Error handling
     *
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response | any) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            errorObject = error.json();
            if (errorObject.status_code !== 422) {
                errorMessage.push(errorObject.message);
            } else {
                if (errorObject.errors.body) errorMessage.push(errorObject.errors.body);
                if (errorObject.errors.user_id) errorMessage.push(errorObject.errors.user_id);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}