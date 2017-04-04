import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { ChampionshipPredict }              from '../../shared/models/championship-predict.model';
import { environment }                      from '../../../environments/environment';

@Injectable()

export class ChampionshipPredictService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private championshipPredictUrl = environment.API_URL + 'championship/predicts';

    /**
     * Update predicts
     *
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<ErrorObservable<T>>|Promise<R>}
     */
    update(value): Observable<any> {
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
        let url = environment.API_URL + 'championship/users/' + id;
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get last predictions
     *
     * @returns {Promise<ErrorObservable<T>>|any|Promise<ErrorObservable<T>|T>|Promise<R>}
     */
    get(): Observable<ChampionshipPredict[]> {
        let url = environment.API_URL + 'championship/predictions';
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
            if (body.championship_predictions) body = body.championship_predictions;
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