import { Injectable }                       from '@angular/core';
import { Http, URLSearchParams }            from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { Club }                             from '../../../shared/models/club.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class ManageClubService {

    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}

    private clubUrl = environment.API_URL + 'clubs';

    /**
     * Get all paginated clubs
     * @param page
     * @param filter
     * @returns {Observable<R>}
     */
    getClubs(page = ''): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http
            .get(this.clubUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get one club data
     * @param id
     * @returns {Observable<R>}
     */
    getClub(id: number): Observable<Club> {
        return this.http
            .get(this.clubUrl + '/' + id)
            .map(response => response.json().club)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get all national teams
     * @returns {Observable<R>}
     */
    getAllNationalTeams(): Observable<Club[]> {
        return this.http
            .get(this.clubUrl + '?type=national_teams')
            .map(response => response.json().clubs)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create club
     * @param club
     * @returns {Observable<R>}
     */
    create(club: Club): Observable<Club> {
        return this.headersWithToken
            .post(this.clubUrl, club)
            .map(response => response.json().club)
            .catch(this.errorHandlerService.handle);
    }
    
    /**
     * Delete one club
     * @param id
     * @returns {Observable<R>}
     */
    delete(id: number): Observable<void> {
        const url = `${this.clubUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update club
     * @param club
     * @returns {Observable<R>}
     */
    update(club: Club): Observable<Club> {
        const url = `${this.clubUrl}/${club.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(club))
            .map(response => response.json().club)
            .catch(this.errorHandlerService.handle);
    }
}