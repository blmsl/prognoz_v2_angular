import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { environment }                      from '../../../../environments/environment';
import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { Tournament }                       from '../../../shared/models/tournament.model';

@Injectable()

export class TournamentService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private http: Http
    ) {}

    private tournamentsUrl = environment.apiUrl + 'tournaments';

    /**
     * Get all tournaments
     * @returns {Observable<Tournament[]>}
     */
    getTournaments(): Observable<Tournament[]> {
        return this.http
            .get(this.tournamentsUrl)
            .map(response => response.json() ? response.json().tournaments : [])
            .catch(this.errorHandlerService.handle);
    }
}