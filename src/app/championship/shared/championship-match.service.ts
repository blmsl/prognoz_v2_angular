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
     * Get matches with current user prediction.
     * It has to be a separate method with separate backend path
     * Because backend can't get current authenticated user if we don't use HeadersWithToken service.
     * @param requestParams
     * @returns {Observable<any>}
     */
    getChampionshipPredictableMatches(requestParams: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        let url = `${this.championshipMatchUrl}-predictable`;
        for (let requestParam of requestParams) {
            params.set(requestParam.parameter, requestParam.value);
        }
        return this.headersWithToken
            .get(url, params)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}