import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ChampionshipMatch }                from '../../shared/models/championship-match.model';
import { environment }                      from '../../../environments/environment';
import { ErrorHandlerService }              from '../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { User }                             from '../../shared/models/user.model';

@Injectable()
export class ChampionshipMatchService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}

    private championshipMatchUrl = environment.apiUrl + 'championship/matches';

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
                .get(environment.apiUrl + 'championship/predicts?filter=' + param)
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
     * @param authenticatedUser
     * @param coming
     * @returns {Observable<ChampionshipMatch[]>}
     */
    getPredictableMatches(authenticatedUser?: User, coming?: boolean): Observable<ChampionshipMatch[]> {
        if (authenticatedUser) {
            let url = environment.apiUrl + 'championship/predicts?filter=predictable';
            if (coming) url += '&coming=true';
            return this.headersWithToken
                .get(url)
                .map(response => response.json().championship_matches || [])
                .catch(this.errorHandlerService.handle);
        } else {
            let url = environment.apiUrl + 'championship/matches?filter=predictable';
            if (coming) url += '&coming=true';
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