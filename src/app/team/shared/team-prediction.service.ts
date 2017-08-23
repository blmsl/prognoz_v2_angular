import { Injectable }                       from '@angular/core';
import { Observable }                       from 'rxjs/Observable';

import { TeamPrediction }                   from '../../shared/models/team-prediction.model';
import { environment }                      from '../../../environments/environment';
import { ErrorHandlerService }              from '../../core/error-handler.service';
import { HeadersWithToken }                 from '../../core/headers-with-token.service';

@Injectable()
export class TeamPredictionService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private teamPredictionUrl = environment.apiUrl + 'team/predictions';

    /**
     * Update or create team prediction
     * @param teamPrediction
     * @returns {Observable<TeamPrediction>}
     */
    updateTeamPrediction(teamPrediction: TeamPrediction): Observable<TeamPrediction> {
        let url = teamPrediction.id ? `${this.teamPredictionUrl}/${teamPrediction.id}` : this.teamPredictionUrl;
        return this.headersWithToken
            .put(url, teamPrediction)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}
