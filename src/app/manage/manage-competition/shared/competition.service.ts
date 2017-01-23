import { Injectable }                       from '@angular/core';
import { Http, Response }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../../shared/app.settings';
import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Competition }                      from './competition.model';

@Injectable()

export class CompetitionService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private competitionUrl = API_URL + 'competitions';

    /**
     * Create competition
     *
     * @param competition
     * @returns {Observable<R>}
     */
    create(competition): Observable<Competition> {
        return this.headersWithToken
            .post(this.competitionUrl, competition)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Update competition
     * 
     * @param id
     * @param params
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>>|Promise<ErrorObservable<T>|T>}
     */
    update(id: number, params): Observable<Competition> {
        const url = `${this.competitionUrl}/${id}`;
        return this.headersWithToken
            .put(url, params)
            .map(this.extractData)
            .catch(this.handleError);
    }


    // /**
    //  * Get competitions by tournament id
    //  *
    //  * @param tournament_id
    //  * @returns {Promise<R>|any|Promise<ErrorObservable<T>>|Promise<ErrorObservable<T>|T>}
    //  */
    // getCompetitions(tournament_id: number): Observable<Competition[]> {
    //     let url = this.competitionUrl + '/tournament/' + tournament_id;
    //     return this.headersWithToken
    //         .get(url)
    //         .map(this.extractData)
    //         .catch(this.handleError);
    // }

    /**
     * Transforms to json
     *
     * @param res
     * @returns {any}
     */
    private extractData(res: Response) {
        if (res && res.status !== 204) {
            let body = res.json();
            if (body.competition) body = body.competition;
            if (body.competitions) body = body.competitions;
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
                if (errorObject.errors.title) errorMessage.push(errorObject.errors.title);
                if (errorObject.errors.active) errorMessage.push(errorObject.errors.active);
                if (errorObject.errors.ended) errorMessage.push(errorObject.errors.ended);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}
