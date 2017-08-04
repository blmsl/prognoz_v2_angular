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
     * @returns {Observable<any>}
     */
    getTeams(): Observable<any> {
        return this.http
            .get(this.teamInfoUrl)
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
}
