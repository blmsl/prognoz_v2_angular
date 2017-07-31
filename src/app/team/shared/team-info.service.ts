import { Injectable }             from '@angular/core';
import { Http, URLSearchParams }  from '@angular/http';
import { Observable }             from 'rxjs/Observable';

import { TeamInfo }               from '../../shared/models/team-info.model';
import { environment }            from '../../../environments/environment';
import { ErrorHandlerService }    from '../../core/error-handler.service';
import { HeadersWithToken }       from '../../core/headers-with-token.service';
import { RequestParams }          from '../../shared/models/request-params.model';

@Injectable()
export class TeamInfoService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) { }

    private teamInfoUrl = environment.apiUrl + 'team/info';

    /**
     * Get teams info (with participants)
     * @returns {Observable<any>}
     */
    getTeamsInfo(): Observable<any> {
          return this.http
              .get(this.teamInfoUrl)
              .map(response => response.json())
              .catch(this.errorHandlerService.handle);
    }
}
