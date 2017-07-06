import { Injectable }                       from '@angular/core';
import { Http, URLSearchParams }            from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { Club }                             from '../../../shared/models/club.model';
import { environment }                      from '../../../../environments/environment';
import { ErrorHandlerService }              from '../../../shared/error-handler.service';
import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';

@Injectable()

export class ClubService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}

    private clubUrl = environment.apiUrl + 'clubs';

    /**
     * Get all paginated clubs
     * @param page
     * @param type
     * @returns {Observable<any>}
     */
    getClubs(page?: number, type?: string): Observable<any> {
        let params = new URLSearchParams();
        if (page) params.set('page', page.toString());
        if (type) params.set('type', type);
        return this.http
            .get(this.clubUrl, {search: params})
            .map(response => {
                return page ? response.json() : (response.json() ? response.json().clubs : []);
            })
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get one club data
     * @param id
     * @returns {Observable<Club>}
     */
    getClub(id: number): Observable<Club> {
        return this.http
            .get(`${this.clubUrl}/${id}`)
            .map(response => response.json().club)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create club
     * @param club
     * @returns {Observable<Club>}
     */
    createClub(club: Club): Observable<Club> {
        return this.headersWithToken
            .post(this.clubUrl, club)
            .map(response => response.json().club)
            .catch(this.errorHandlerService.handle);
    }
    
    /**
     * Delete club
     * @param id
     * @returns {Observable<void>}
     */
    deleteClub(id: number): Observable<void> {
        return this.headersWithToken
            .delete(`${this.clubUrl}/${id}`)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update club
     * @param club
     * @returns {Observable<Club>}
     */
    updateClub(club: Club): Observable<Club> {
        return this.headersWithToken
            .put(`${this.clubUrl}/${club.id}`, JSON.stringify(club))
            .map(response => response.json().club)
            .catch(this.errorHandlerService.handle);
    }
}