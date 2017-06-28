import { Injectable }                       from '@angular/core';
import { Http }                             from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { Season }                           from '../../../shared/models/season.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class ManageSeasonService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private seasonsUrl = environment.API_URL + 'seasons';

    /**
     * Get all seasons
     * @returns {Observable<Season[]>}
     */
    getSeasons(): Observable<Season[]> {
        return this.http
            .get(this.seasonsUrl)
            .map(response => response.json().seasons || [])
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get season
     * @param id
     * @returns {Observable<Season>}
     */
    getSeason(id): Observable<Season> {
        return this.http
            .get(this.seasonsUrl + "/" + id)
            .map(response => response.json().season)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create season
     *
     * @param season
     * @returns {Observable<Season>}
     */
    create(season: Season): Observable<Season> {
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
    update(season: Season): Observable<Season> {
        const url = `${this.seasonsUrl}/${season.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(season))
            .map(response => response.json().season)
            .catch(this.errorHandlerService.handle);
    }
}