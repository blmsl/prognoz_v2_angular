import { Injectable }                       from '@angular/core';
import { Http, URLSearchParams }            from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ChampionshipRating }               from '../../shared/models/championship-rating.model';
import { ErrorHandlerService }              from '../../shared/error-handler.service';
import { environment }                      from '../../../environments/environment';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { RequestParams }                    from '../../shared/models/request-params.model';

@Injectable()

export class ChampionshipRatingService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}

    private championshipRatingUrl = environment.apiUrl + 'championship/rating';

    /**
     * Get championship rating
     * @param requestParams
     * @returns {Observable<any>}
     */
    getChampionshipRatingItems(requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.championshipRatingUrl, requestParams ? {search: params} : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get championship rating item
     * @param userId
     * @param competitionId
     * @returns {Observable<ChampionshipRating>}
     */
    getChampionshipRatingItem(userId: number, competitionId?: number): Observable<ChampionshipRating> {
        let params = new URLSearchParams();
        if (competitionId) params.set('competition_id', competitionId.toString());
        return this.http
            .get(`${this.championshipRatingUrl}/${userId}`, {search: params})
            .map(response => response.json().championship_rating)
            .catch(this.errorHandlerService.handle)
    }

    /**
     * Update positions and moving
     * @returns {Observable<void>}
     */
    updateChampionshipRatingItems(): Observable<void> {
        return this.headersWithToken
            .put(this.championshipRatingUrl, {})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}
