import { Injectable }               from '@angular/core';
import { HttpClient, HttpParams }   from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { TeamRatingUser }       from '../../shared/models/team-rating-user.model';
import { environment }          from '../../../environments/environment';
import { ErrorHandlerService }  from '../../core/error-handler.service';
import { RequestParams }        from '../../shared/models/request-params.model';

@Injectable()
export class TeamRatingUserService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private httpClient: HttpClient
    ) {}

    private teamRatingUserUrl = environment.apiUrl + 'team/rating-user';

    /**
     * Get team rating user
     * @param requestParams
     * @returns {Observable<TeamRatingUser[]>}
     */
    getTeamRatingUser(requestParams?: RequestParams[]): Observable<TeamRatingUser[]> {
        let params: HttpParams = new HttpParams();
        if (requestParams) {
            for (const requestParam of requestParams) {
                params = params.append(requestParam.parameter, requestParam.value);
            }
        }
        return this.httpClient
            .get(this.teamRatingUserUrl, {params: params})
            .map(response => response['team_rating_users'])
            .catch(this.errorHandlerService.handle);
    }
}
