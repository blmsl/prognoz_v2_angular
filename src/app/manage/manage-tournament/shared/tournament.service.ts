import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { environment }                      from '../../../../environments/environment';
import { ErrorHandlerService }              from '../../../core/error-handler.service';

@Injectable()

export class TournamentService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: Http
    ) {}

    private tournamentsUrl = environment.apiUrl + 'tournaments';

    /**
     * Get all tournaments
     * @returns {Observable<any>}
     */
    getTournaments(): Observable<any> {
        return this.http
            .get(this.tournamentsUrl)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}