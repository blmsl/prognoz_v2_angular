import { Injectable }                       from '@angular/core';
import { Http, Response }                   from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../shared/app.settings';
import { HeadersWithToken }                 from '../../shared/headers-with-token.service';
import { ChampionshipMatch }                from '../../manage/manage-championship/shared/championship-match.model';
import { UserService }                      from '../../shared/user.service';

@Injectable()

export class ChampionshipMatchService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken,
        private userService: UserService
    ) {
        this.authenticatedUser = this.userService.sharedUser;
    }

    authenticatedUser: any;

    private championshipMatchUrl = API_URL + 'championship/matches';

    /**
     * Get all predictable matches
     *
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<ErrorObservable<T>>|Promise<R>}
     */
    getPredictable(): Observable<ChampionshipMatch[]> {
        let url = this.championshipMatchUrl + '/predictable';
        if (this.authenticatedUser) url = url + '/' + this.authenticatedUser.id;
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
            //if (body.match) body = body.match;
            if (body.championship_matches) body = body.championship_matches;
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