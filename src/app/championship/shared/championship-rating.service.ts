import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../shared/app.settings';
import { ChampionshipRating }               from '../shared/championship-rating.model';

@Injectable()

export class ChampionshipRatingService {

    constructor(private http:Http) {}

    private championshipPredictUrl = API_URL + 'championship/rating';

    /**
     * Get current championship rating
     *
     * @returns {Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>|Promise<R>|any}
     */
    get(param = null): Observable<ChampionshipRating[]> {
        let url = param ? (this.championshipPredictUrl + '?filter=' + param) : this.championshipPredictUrl;
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
            if (body.championship_ratings) body = body.championship_ratings;
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
                //
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }

}
