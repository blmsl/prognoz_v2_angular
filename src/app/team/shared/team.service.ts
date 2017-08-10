import { Injectable }             from '@angular/core';
import { Http, URLSearchParams }  from '@angular/http';
import { Observable }             from 'rxjs/Observable';

import { Team }                   from '../../shared/models/team.model';
import { environment }            from '../../../environments/environment';
import { ErrorHandlerService }    from '../../core/error-handler.service';
import { HeadersWithToken }       from '../../core/headers-with-token.service';
import { RequestParams }          from '../../shared/models/request-params.model';

@Injectable()
export class TeamService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) { }

    private teamInfoUrl = environment.apiUrl + 'team/teams';

    /**
     * Get teams info (with participants)
     * @param requestParams
     * @returns {Observable<any>}
     */
    getTeams(requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.teamInfoUrl, requestParams ? {search: params} : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create new team
     * @param team
     * @returns {Observable<Team>}
     */
    createTeam(team: Team): Observable<Team> {
        return this.headersWithToken
            .post(this.teamInfoUrl, team)
            .map(response => response.json().team)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update team
     * @param team
     * @returns {Observable<Team>}
     */
    updateTeam(team: Team): Observable<Team> {
        return this.headersWithToken
            .put(`${this.teamInfoUrl}/${team.id}`, team)
            .map(response => response.json().team)
            .catch(this.errorHandlerService.handle);
    }
}
