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
     * Update positions and moving
     * @returns {Observable<void>}
     */
    updateRatingPositions(): Observable<void> {
        return this.headersWithToken
            .put(this.championshipRatingUrl, {})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get championship rating
     * @param requestParams
     * @returns {Observable<any>}
     */
    getChampionshipRating(requestParams?: RequestParams[]): Observable<any> {
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
     */
    getChampionshipRatingItem() {

    }
}
