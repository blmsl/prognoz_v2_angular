import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Tournament }                       from '../../../shared/models/tournament.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class ManageTournamentService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private tournamentsUrl = environment.API_URL + 'tournaments';

    /**
     * Get all tournaments
     *
     * @returns {Observable<R>}
     */
    getTournaments(): Observable<Tournament[]> {
        return this.http
            .get(this.tournamentsUrl)
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
            if (body.tournaments) body = body.tournaments;
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
                //
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}