import { Injectable }               from '@angular/core';
import { HttpClient, HttpParams }   from '@angular/common/http';
import { Observable }               from 'rxjs/Observable';

import { TeamRating }           from '../../shared/models/team-rating.model';
import { environment }          from '../../../environments/environment';
import { ErrorHandlerService }  from '../../core/error-handler.service';
import { RequestParams }        from '../../shared/models/request-params.model';

@Injectable()
export class TeamRatingService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private httpClient: HttpClient
    ) {}

    private teamRatingUrl = environment.apiUrl + 'team/rating';

    /**
     * Get team rating
     * @param requestParams
     * @returns {Observable<TeamRating[]>}
     */
    getTeamRating(requestParams?: RequestParams[]): Observable<TeamRating[]> {
        let params: HttpParams = new HttpParams();
        if (requestParams) {
            for (const requestParam of requestParams) {
                params = params.append(requestParam.parameter, requestParam.value);
            }
        }
        return this.httpClient
            .get(this.teamRatingUrl, {params: params})
            .map(response => response['team_ratings'])
            .catch(this.errorHandlerService.handle);
    }
}