import { Injectable }                       from '@angular/core';
import { Http, URLSearchParams }            from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ChampionshipRating }               from '../../shared/models/championship-rating.model';
import { ErrorHandlerService }              from '../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { RequestParams }                    from '../../shared/models/request-params.model';
import { environment }                      from '../../../environments/environment';

@Injectable()

export class ChampionshipRatingService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private championshipRatingUrl = environment.API_URL + 'championship/rating';

    /**
     * Update positions and moving
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<R>|Promise<ErrorObservable<T>>}
     */
    updatePositions(): Observable<any> {
        return this.headersWithToken
            .put(this.championshipRatingUrl, {})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get championship rating
     * @param requestParams
     * @returns {Promise<ErrorObservable|T>|any|Promise<ErrorObservable>|Maybe<T>|Promise<R>}
     */
    get(requestParams?: RequestParams[]): Observable<ChampionshipRating[]> {
        if (requestParams) {
            var params: URLSearchParams = new URLSearchParams();
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        
        return this.http
            .get(this.championshipRatingUrl, requestParams ? {search: params} : null)
            .map(response => response.json().championship_ratings || [])
            .catch(this.errorHandlerService.handle);
    }
}
