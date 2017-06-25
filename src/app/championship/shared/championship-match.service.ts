import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ErrorHandlerService }              from '../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { ChampionshipMatch }                from '../../shared/models/championship-match.model';
import { User }                             from '../../shared/models/user.model';
import { environment }                      from '../../../environments/environment';

@Injectable()
export class ChampionshipMatchService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private championshipMatchUrl = environment.API_URL + 'championship/matches';

    /**
     * Create championship match
     * @param championshipMatch
     * @returns {Observable<R>}
     */
    create(championshipMatch: ChampionshipMatch): Observable<ChampionshipMatch> {
        return this.headersWithToken
            .post(this.championshipMatchUrl, championshipMatch)
            .map(response => response.json().championship_match)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update championship match
     * @param championshipMatch
     * @param id
     */
    update(championshipMatch: ChampionshipMatch, id: number): Observable<ChampionshipMatch> {
        const url = `${this.championshipMatchUrl}/${id}`;
        return this.headersWithToken
            .put(url, championshipMatch)
            .map(response => response.json().championship_match)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get match info with predicts
     * @param id
     * @returns {any|Promise<R>|Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>}
     */
    getWithPredicts(id: number): Observable<ChampionshipMatch> {
        let url = this.championshipMatchUrl + '/' + id;
        return this.http.get(url)
            .map(response => response.json().championship_match)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Universal method for current championship matches get request
     * Available params: 'active', 'ended', 'last', 'predictable'
     * @param param
     * @param competitionId
     * @param authenticatedUser
     * @returns {Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>|any|Promise<R>}
     */
    getCurrentCompetitionMatches(param = null, competitionId: number = null, authenticatedUser?: User): Observable<ChampionshipMatch[]> {
        let url = param ? (this.championshipMatchUrl + '?filter=' + param) : this.championshipMatchUrl;
        if (!param && competitionId) url += '?competition_id=' + competitionId;
        if (param && competitionId) url += '&competition_id=' + competitionId;
        if (param === 'predictable' && authenticatedUser) {
            return this.headersWithToken
                .get(environment.API_URL + 'championship/predicts?filter=' + param)
                .map(response => response.json().championship_matches || [])
                .catch(this.errorHandlerService.handle);
        }
        return this.http
            .get(url)
            .map(response => response.json().championship_matches || [])
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get predictable matches by date
     * @param date
     * @param authenticatedUser
     * @returns {Observable<R|T>}
     */
    getPredictableMatchesByDate(date: string, authenticatedUser?: User): Observable<ChampionshipMatch[]> {
        if (authenticatedUser) {
            let url = environment.API_URL + 'championship/predicts?filter=predictable&date=' + date;
            return this.headersWithToken
                .get(url)
                .map(response => response.json().championship_matches || [])
                .catch(this.errorHandlerService.handle);
        } else {
            let url = environment.API_URL + 'championship/matches?filter=predictable&date=' + date;
            return this.http
                .get(url)
                .map(response => response.json().championship_matches || [])
                .catch(this.errorHandlerService.handle);
        }
    }

    /**
     * Get match statistic
     * @param id
     */
    getStatistic(id: number): Observable<any> {
        let url = this.championshipMatchUrl + '/' + id + '?statistic=true';
        return this.http.get(url)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}