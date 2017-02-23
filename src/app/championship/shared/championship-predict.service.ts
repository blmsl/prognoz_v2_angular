import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../shared/app.settings';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { ChampionshipPredict }              from './championship-predict.model';

@Injectable()

export class ChampionshipPredictService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private championshipPredictUrl = API_URL + 'championship/predicts';

    /**
     * Update predicts
     *
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<ErrorObservable<T>>|Promise<R>}
     */
    update(value): Observable<any> {
        console.log(value);
        return this.headersWithToken
            .put(this.championshipPredictUrl, value)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get user predicts by id
     *
     * @param id
     * @returns {Promise<ErrorObservable<T>|T>|Promise<R>|any|Promise<ErrorObservable<T>>}
     */
    user(id: number): Observable<ChampionshipPredict[]> {
        let url = API_URL + 'championship/users/' + id;
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
            if (body.championship_matches) body = body.championship_matches;
            if (body.championship_predicts) body = body.championship_predicts;
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