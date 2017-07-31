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
     * @returns {Observable<any>}
     */
    getTeamParticipants(): Observable<any> {
          return this.http
              .get(this.teamParticipantUrl)
              .map(response => response.json())
              .catch(this.errorHandlerService.handle);
    }
}
