import { Injectable }               from '@angular/core';
import { Http, URLSearchParams }    from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { TeamRating }               from '../../shared/models/team-rating.model';
import { environment }              from '../../../environments/environment';
import { ErrorHandlerService }      from '../../core/error-handler.service';
import { RequestParams }            from '../../shared/models/request-params.model';

@Injectable()
export class TeamRatingService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: Http
    ) {}

    private teamRatingUrl = environment.apiUrl + 'team/rating';

    /**
     * Get team rating
     * @param requestParams
     * @returns {Observable<TeamRating[]>}
     */
    getTeamRating(requestParams?: RequestParams[]): Observable<TeamRating[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.teamRatingUrl, requestParams ? {search: params} : null)
            .map(response => response.json().team_ratings)
            .catch(this.errorHandlerService.handle);
    }
}