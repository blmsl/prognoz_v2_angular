import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { ChampionshipMatch }                from '../../shared/models/championship-match.model';
import { UserService }                      from '../../shared/user.service';
import { environment }                      from '../../../environments/environment';

@Injectable()

export class ChampionshipMatchService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken,
        private userService: UserService
    ) {
        this.authenticatedUser = this.userService.sharedUser;
    }

    authenticatedUser: any;

    private championshipMatchUrl = environment.API_URL + 'championship/matches';

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
     * Get match info with predicts
     *
     * @param id
     * @returns {any|Promise<R>|Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>}
     */
    getWithPredicts(id: number): Observable<ChampionshipMatch> {
        let url = this.championshipMatchUrl + '/' + id;
        return this.http.get(url)
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
        if (param === 'predictable' && this.userService.sharedUser) {
            return this.headersWithToken
                .get(environment.API_URL + 'championship/predicts?filter=' + param)
                .map(this.extractData)
                .catch(this.handleError);
        }
        return this.http
            .get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get predictable matches by date
     *
     * @param date
     * @returns {Promise<ErrorObservable|T>|Promise<ErrorObservable>|any|Maybe<T>|Promise<R>}
     */
    getPredictableMatchesByDate(date: string): Observable<ChampionshipMatch[]> {
        if (this.userService.sharedUser) {
            let url = environment.API_URL + 'championship/predicts?filter=predictable&date=' + date;
            return this.headersWithToken
                .get(url)
                .map(this.extractData)
                .catch(this.handleError);
        } else {
            let url = environment.API_URL + 'championship/matches?filter=predictable&date=' + date;
            return this.http
                .get(url)
                .map(this.extractData)
                .catch(this.handleError);
        }
    }

    /**
     * Get match statistic
     *
     * @param id
     * @returns {Promise<ErrorObservable|T>|any|Promise<R>|Promise<ErrorObservable>|Maybe<T>}
     */
    getStatistic(id: number): Observable<any> {
        let url = this.championshipMatchUrl + '/' + id + '?statistic=true';
        return this.http.get(url)
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