import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class ManageChampionshipRatingService {
    
    constructor(
        private headersWithToken: HeadersWithToken
    ) {}

    private championshipMatchUrl = environment.API_URL + 'championship/rating';

    /**
     * Update positions and moving
     * 
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<R>|Promise<ErrorObservable<T>>}
     */
    updatePositions(): Observable<any> {
        return this.headersWithToken
            .put(this.championshipMatchUrl, {})
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
                
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}