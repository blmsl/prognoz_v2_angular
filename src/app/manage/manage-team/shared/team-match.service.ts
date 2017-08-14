import { Injectable }           from '@angular/core';
import { Observable }           from 'rxjs/Observable';

import { environment }          from '../../../../environments/environment';
import { ErrorHandlerService }  from '../../../core/error-handler.service';
import { HeadersWithToken }     from '../../../core/headers-with-token.service';
import { TeamMatch }            from '../../../shared/models/team-match.model';

@Injectable()
export class TeamMatchService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
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
}
