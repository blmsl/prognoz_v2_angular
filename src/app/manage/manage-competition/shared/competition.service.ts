import { Injectable }                       from '@angular/core';
import { Http, URLSearchParams }            from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { Competition }                      from '../../../shared/models/competition.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class CompetitionService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private competitionUrl = environment.API_URL + 'competitions';

    /**
     * Get competitions list
     * @param page
     * @param season
     * @param tournament
     * @returns {Observable<any>}
     */
    getCompetitions(page?: number, tournament?: number, season?: number): Observable<any> {
        let params = new URLSearchParams();
        if (page) params.set('page', page.toString());
        if (tournament) params.set('tournament', tournament.toString());
        if (season) params.set('season', season.toString());
        return this.http
            .get(this.competitionUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get competition by id
     * @param id
     * @returns {Competition}
     */
    getCompetition(id: number): Observable<Competition> {
        return this.http
            .get(`${this.competitionUrl}/${id}`)
            .map(response => response.json().competition)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create competition
     * @param competition
     * @returns {Observable<Competition>}
     */
    createCompetition(competition: Competition): Observable<Competition> {
        return this.headersWithToken
            .post(this.competitionUrl, competition)
            .map(response => response.json().competition)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update competition
     * @param competition
     * @returns {Observable<Competition>}
     */
    updateCompetition(competition: Competition): Observable<Competition> {
        return this.headersWithToken
            .put(`${this.competitionUrl}/${competition.id}`, competition)
            .map(response => response.json().competition)
            .catch(this.errorHandlerService.handle);
    }
}
