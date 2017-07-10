import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { environment }                      from '../../../../environments/environment';
import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Season }                           from '../../../shared/models/season.model';

@Injectable()

export class SeasonService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}

    private seasonsUrl = environment.apiUrl + 'seasons';

    /**
     * Get all seasons
     * @returns {Observable<any>}
     */
    getSeasons(): Observable<any> {
        return this.http
            .get(this.seasonsUrl)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get season
     * @param id
     * @returns {Observable<Season>}
     */
    getSeason(id: number): Observable<Season> {
        return this.http
            .get(`${this.seasonsUrl}/${id}`)
            .map(response => response.json().season)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create season
     * @param season
     * @returns {Observable<Season>}
     */
    createSeason(season: Season): Observable<Season> {
        return this.headersWithToken
            .post(this.seasonsUrl, season)
            .map(response => response.json().season)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update season
     * @param season
     * @returns {Observable<Season>}
     */
    updateSeason(season: Season): Observable<Season> {
        return this.headersWithToken
            .put(`${this.seasonsUrl}/${season.id}`, JSON.stringify(season))
            .map(response => response.json().season)
            .catch(this.errorHandlerService.handle);
    }
}