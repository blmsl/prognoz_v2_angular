import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { Tournament }                       from '../../../shared/models/tournament.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class TournamentService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService
    ) {}

    private tournamentsUrl = environment.API_URL + 'tournaments';

    /**
     * Get all tournaments
     * @returns {Observable<Tournament[]>}
     */
    getTournaments(): Observable<Tournament[]> {
        return this.http
            .get(this.tournamentsUrl)
            .map(response => response.json().tournaments || [])
            .catch(this.errorHandlerService.handle);
    }
}