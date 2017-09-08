import { Injectable }               from '@angular/core';
import { Http, URLSearchParams }    from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { TeamRatingUser }           from '../../shared/models/team-rating-user.model';
import { environment }              from '../../../environments/environment';
import { ErrorHandlerService }      from '../../core/error-handler.service';
import { RequestParams }            from '../../shared/models/request-params.model';

@Injectable()
export class TeamRatingUserService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: Http
    ) {}

    private teamRatingUserUrl = environment.apiUrl + 'team/rating-user';

    /**
     * Get team rating user
     * @param requestParams
     * @returns {Observable<TeamRatingUser[]>}
     */
    getTeamRatingUser(requestParams?: RequestParams[]): Observable<TeamRatingUser[]> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.teamRatingUserUrl, requestParams ? {search: params} : null)
            .map(response => response.json().team_rating_users)
            .catch(this.errorHandlerService.handle);
    }
}