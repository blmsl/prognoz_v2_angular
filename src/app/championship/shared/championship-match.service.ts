import { Injectable }                       from '@angular/core';
import { Http, URLSearchParams }            from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ChampionshipMatch }                from '../../shared/models/championship-match.model';
import { environment }                      from '../../../environments/environment';
import { ErrorHandlerService }              from '../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { RequestParams }                    from '../../shared/models/request-params.model';
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
     * @returns {Observable<ChampionshipMatch>}
     */
    createChampionshipMatch(championshipMatch: ChampionshipMatch): Observable<ChampionshipMatch> {
        return this.headersWithToken
            .post(this.championshipMatchUrl, championshipMatch)
            .map(response => response.json().championship_match)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update championship match
     * @param championshipMatch
     * @returns {Observable<ChampionshipMatch>}
     */
    updateChampionshipMatch(championshipMatch: ChampionshipMatch): Observable<ChampionshipMatch> {
        return this.headersWithToken
            .put(`${this.championshipMatchUrl}/${championshipMatch.id}`, championshipMatch)
            .map(response => response.json().championship_match)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get match info
     * @param id
     * @param requestParams
     * @returns {Observable<any>}
     */
    getChampionshipMatch(id: number, requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(`${this.championshipMatchUrl}/${id}`, requestParams ? {search: params} : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get championship matches
     * @param requestParams
     * @returns {Observable<any>}
     */
    getChampionshipMatches(requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.championshipMatchUrl, requestParams ? {search: params} : null)
            .map(response => response.json())
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
}