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
     * @returns {Observable<R>}
     */
    get(page = null, tournament = null, season = null): Observable<any> {
        let params = new URLSearchParams();
        if (page) params.set('page', page);
        if (tournament) params.set('tournament', tournament);
        if (season) params.set('season', season);
        return this.http
            .get(this.competitionUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle)
    }

    /**
     * Get competition by id
     * @param id
     * @returns {any}
     */
    getCompetition(id: number): Observable<Competition> {
        return this.http
            .get(this.competitionUrl + "/" + id)
            .map(response => response.json().competition)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create competition
     * @param competition
     * @returns {Observable<R>}
     */
    create(competition): Observable<Competition> {
        return this.headersWithToken
            .post(this.competitionUrl, competition)
            .map(response => response.json().competition)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update competition
     * @param id
     * @param params
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>>|Promise<ErrorObservable<T>|T>}
     */
    update(id: number, params): Observable<Competition> {
        const url = `${this.competitionUrl}/${id}`;
        return this.headersWithToken
            .put(url, params)
            .map(response => response.json().competition)
            .catch(this.errorHandlerService.handle);
    }
}
