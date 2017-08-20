import { Injectable }             from '@angular/core';
import { Http, URLSearchParams }  from '@angular/http';
import { Observable }             from 'rxjs/Observable';

import { TeamParticipant }        from '../../shared/models/team-participant.model';
import { environment }            from '../../../environments/environment';
import { ErrorHandlerService }    from '../../core/error-handler.service';
import { HeadersWithToken }       from '../../core/headers-with-token.service';
import { RequestParams }          from '../../shared/models/request-params.model';

@Injectable()
export class TeamParticipantService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) { }

    private teamParticipantUrl = environment.apiUrl + 'team/participants';

    /**
     * Get team participants
     * @param requestParams
     * @returns {Observable<any>}
     */
    getTeamParticipants(requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.http
            .get(this.teamParticipantUrl, requestParams ? {search: params} : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get participants for captain
     *
     * @param requestParams
     * @returns {Observable<any>}
     */
    getCurrentTeamParticipants(requestParams: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        for (let requestParam of requestParams) {
            params.set(requestParam.parameter, requestParam.value);
        }
        return this.headersWithToken
            .get(this.teamParticipantUrl, params)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create team participant
     * @param teamParticipant
     * @returns {Observable<TeamParticipant>}
     */
    createTeamParticipant(teamParticipant: TeamParticipant): Observable<TeamParticipant> {
        return this.headersWithToken
            .post(this.teamParticipantUrl, teamParticipant)
            .map(response => response.json().team_participant)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update team participant
     * @param teamParticipant
     * @returns {Observable<TeamParticipant>}
     */
    updateTeamParticipant(teamParticipant: TeamParticipant): Observable<TeamParticipant> {
        return this.headersWithToken
            .put(`${this.teamParticipantUrl}/${teamParticipant.id}`, teamParticipant)
            .map(response => response.json().team_participant)
            .catch(this.errorHandlerService.handle);
    }
}
