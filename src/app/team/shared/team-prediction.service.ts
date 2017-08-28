import { Injectable }                       from '@angular/core';
import { Observable }                       from 'rxjs/Observable';
import { URLSearchParams }                  from '@angular/http';

import { environment }                      from '../../../environments/environment';
import { ErrorHandlerService }              from '../../core/error-handler.service';
import { HeadersWithToken }                 from '../../core/headers-with-token.service';
import { RequestParams }                    from '../../shared/models/request-params.model';
import { TeamPrediction }                   from '../../shared/models/team-prediction.model';

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

    /**
     * Get team predictions
     * @param requestParams
     * @returns {Observable<any>}
     */
    getTeamPredictions(requestParams?: RequestParams[]): Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        if (requestParams) {
            for (let requestParam of requestParams) {
                params.set(requestParam.parameter, requestParam.value);
            }
        }
        return this.headersWithToken
            .get(this.teamPredictionUrl, requestParams ? params : null)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}
