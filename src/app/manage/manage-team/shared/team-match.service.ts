import { Injectable }               from '@angular/core';
import { Http, URLSearchParams }    from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '../../../../environments/environment';
import { ErrorHandlerService }      from '../../../core/error-handler.service';
import { HeadersWithToken }         from '../../../core/headers-with-token.service';
import { TeamMatch }                from '../../../shared/models/team-match.model';
import { RequestParams }            from '../../../shared/models/request-params.model';

@Injectable()
export class TeamMatchService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) { }

    private teamMatchUrl = environment.apiUrl + 'team/matches';

    /**
     * Create team match
     * @param teamMatch
     * @returns {Observable<TeamMatch>}
     */
    createTeamMatch(teamMatch: TeamMatch): Observable<TeamMatch> {
        return this.headersWithToken
            .post(this.teamMatchUrl, teamMatch)
            .map(response => response.json().team_match)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get team matches
     * @param requestParams
     * @returns {Observable<any>}
     */
    getTeamMatches(requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.teamMatchUrl, requestParams ? {search: params} : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update team match
     * @param teamMatch
     * @returns {Observable<TeamMatch>}
     */
    updateTeamMatch(teamMatch: TeamMatch): Observable<TeamMatch> {
        return this.headersWithToken
            .put(`${this.teamMatchUrl}/${teamMatch.id}`, teamMatch)
            .map(response => response.json().team_match)
            .catch(this.errorHandlerService.handle);
    }
}
