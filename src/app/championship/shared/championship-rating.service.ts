import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ChampionshipRating }               from '../../shared/models/championship-rating.model';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { RequestParams }                    from '../../shared/models/request-params.model';
import { environment }                      from '../../../environments/environment';

@Injectable()

export class ChampionshipRatingService {

    constructor(
        private http:Http,
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
            .map(this.extractData)
            .catch(this.handleError);
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
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Transforms to json
     * @param res
     * @returns {any}
     */
    private extractData(res: Response) {
        if (res && res.status !== 204) {
            let body = res.json();
            if (body.championship_ratings) body = body.championship_ratings;
            return body || {};
        }

        return res;
    }

    /**
     * Error handling
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
                //
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }

}
