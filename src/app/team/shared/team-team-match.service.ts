import { Injectable }             from '@angular/core';
import { Http, URLSearchParams }  from '@angular/http';
import { Observable }             from 'rxjs/Observable';

import { environment }            from '../../../environments/environment';
import { ErrorHandlerService }    from '../../core/error-handler.service';
import { HeadersWithToken }       from '../../core/headers-with-token.service';
import { RequestParams }          from '../../shared/models/request-params.model';
import { TeamTeamMatch }          from '../../shared/models/team-team-match.model';

@Injectable()
export class TeamTeamMatchService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) { }

    private teamTeamMatchUrl = environment.apiUrl + 'team/team-matches';

    /**
     * Get all matches
     * @param page
     * @returns {Observable<any>}
     */
    getTeamTeamMatches(page?: number): Observable<any> {
        let params = new URLSearchParams();
        if (page) params.set('page', page.toString());
        return this.http
            .get(this.teamTeamMatchUrl, page ? {search: params} : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update team-team match
     * @param teamTeamMatch
     * @returns {Observable<TeamTeamMatch>}
     */
    updateTeamTeamMatch(teamTeamMatch: TeamTeamMatch): Observable<TeamTeamMatch> {
        return this.headersWithToken
            .put(`${this.teamTeamMatchUrl}/${teamTeamMatch.id}`, teamTeamMatch)
            .map(response => response.json().team_team_match)
            .catch(this.errorHandlerService.handle);
    }
}
