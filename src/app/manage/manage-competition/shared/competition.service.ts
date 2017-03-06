import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Competition }                      from './competition.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class CompetitionService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private competitionUrl = environment.API_URL + 'competitions';

    /**
     * Get competitions list
     *
     * @param page
     * @returns {Observable<R>}
     */
    get(page:string = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http
            .get(this.competitionUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError)
    }

    /**
     * Get competition by id
     *
     * @param id
     * @returns {any}
     */
    getCompetition(id: number): Observable<Competition> {
        return this.http
            .get(this.competitionUrl + "/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

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
                if (errorObject.errors.season_id) errorMessage.push(errorObject.errors.season_id);
                if (errorObject.errors.tournament_id) errorMessage.push(errorObject.errors.tournament_id);
                if (errorObject.errors.active) errorMessage.push(errorObject.errors.active);
                if (errorObject.errors.ended) errorMessage.push(errorObject.errors.ended);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}
