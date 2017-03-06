import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Season }                           from './season.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class ManageSeasonService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private seasonsUrl = environment.API_URL + 'seasons';

    /**
     * Get all seasons
     *
     * @param page
     * @returns {Observable<R>}
     */
    getSeasons(): Observable<Season[]> {
        return this.http
            .get(this.seasonsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get season
     *
     * @param id
     * @returns {Observable<R>}
     */
    getSeason(id): Observable<Season> {
        return this.http
            .get(this.seasonsUrl + "/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Create season
     *
     * @param news
     * @returns {Observable<R>}
     */
    create(season: Season): Observable<Season> {
        return this.headersWithToken
            .post(this.seasonsUrl, season)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Update season
     *
     * @param news
     * @returns {Observable<R>}
     */
    update(season: Season): Observable<Season> {
        const url = `${this.seasonsUrl}/${season.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(season))
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
            if (body.seasons) body = body.seasons;
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
                if (errorObject.errors.title) errorMessage.push(errorObject.errors.title);
                if (errorObject.errors.active) errorMessage.push(errorObject.errors.active);
                if (errorObject.errors.ended) errorMessage.push(errorObject.errors.ended);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}