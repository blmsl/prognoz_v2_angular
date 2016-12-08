import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../../shared/app.settings';
import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Club }                             from '../shared/club.model';

@Injectable()

export class ManageClubService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private clubUrl = API_URL + 'club';

    /**
     * Get all paginated clubs
     *
     * @param page
     * @returns {Observable<R>}
     */
    getClubs(page = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http
            .get(this.clubUrl, {search: params})
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
            if (body.club) body = body.club;
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
                if (errorObject.errors.parent_id) errorMessage.push(errorObject.errors.parent_id);
                if (errorObject.errors.title) errorMessage.push(errorObject.errors.title);
                if (errorObject.errors.link) errorMessage.push(errorObject.errors.link);
                if (errorObject.errors.image) errorMessage.push(errorObject.errors.image);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}