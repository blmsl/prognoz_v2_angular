import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../../shared/app.settings';
import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { ChampionshipMatch }                from '../shared/championship-match.model';

@Injectable()

export class ManageChampionshipMatchService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private championshipMatchUrl = API_URL + 'championship/matches';
    
    /**
     * Create championship match
     *
     * @param championshipMatch
     * @returns {Observable<R>}
     */
    create(championshipMatch: ChampionshipMatch): Observable<any> {
        return this.headersWithToken
            .post(this.championshipMatchUrl, championshipMatch)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Update championship match
     *
     * @param championshipMatch
     * @param id
     */
    update(championshipMatch: ChampionshipMatch, id: number): Observable<ChampionshipMatch> {
        const url = `${this.championshipMatchUrl}/${id}`;
        return this.headersWithToken
            .put(url, championshipMatch)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Universal method for current championship matches get request
     * Available params: 'active', 'ended', 'last', 'predictable'
     *
     * @param param
     * @returns {Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>|any|Promise<R>}
     */
    getCurrentCompetitionMatches(param = null): Observable<ChampionshipMatch[]> {
        let url = param ? (this.championshipMatchUrl + '?filter=' + param) : this.championshipMatchUrl;
        return this.http
            .get(url)
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
            if (body.match) body = body.match;
            if (body.championship_matches) body = body.championship_matches;
            if (body.championship_match) body = body.championship_match;
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
                if (errorObject.errors.t1_id) errorMessage.push(errorObject.errors.t1_id);
                if (errorObject.errors.t2_id) errorMessage.push(errorObject.errors.t2_id);
                if (errorObject.errors.starts_at) errorMessage.push(errorObject.errors.starts_at);
                if (errorObject.errors.id) errorMessage.push(errorObject.errors.id);
                if (errorObject.errors.home) errorMessage.push(errorObject.errors.home);
                if (errorObject.errors.away) errorMessage.push(errorObject.errors.away);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}