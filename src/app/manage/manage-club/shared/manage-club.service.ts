import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams }  from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';
import { Club }                             from '../shared/club.model';
import { environment }                      from '../../../../environments/environment';

@Injectable()

export class ManageClubService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private clubUrl = environment.API_URL + 'clubs';

    /**
     * Get all paginated clubs
     *
     * @param page
     * @param filter
     * @returns {Observable<R>}
     */
    getClubs(page = ''): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http
            .get(this.clubUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get one club data
     *
     * @param id
     * @returns {Observable<R>}
     */
    getClub(id: number): Observable<Club> {
        return this.http
            .get(this.clubUrl + '/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get all national teams
     *
     * @returns {Observable<R>}
     */
    getAllNationalTeams(): Observable<any> {
        return this.http
            .get(this.clubUrl + '?type=national_teams')
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Create club
     *
     * @param club
     * @returns {Observable<R>}
     */
    create(club: Club): Observable<any> {
        return this.headersWithToken
            .post(this.clubUrl, club)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    /**
     * Delete one club
     *
     * @param id
     * @returns {Observable<R>}
     */
    delete(id: number): Observable<void> {
        const url = `${this.clubUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Update club
     *
     * @param club
     * @returns {Observable<R>}
     */
    update(club: Club): Observable<Club> {
        const url = `${this.clubUrl}/${club.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(club))
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Transforms to json
     *
     * @param res
     * @returns {any}
     */
    private extractData(res: Response) {
        if (res && res.status !== 204) {
            let body = res.json();
            if (body.club) body = body.club;
            if (body.clubs) body = body.clubs;
            return body || {};
        }

        return res;
    }

    /**
     * Error handling
     *
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response | any) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            errorObject = error.json();
            if (errorObject.status_code !== 422) {
                errorMessage.push(errorObject.message);
            } else {
                if (errorObject.errors.parent_id) errorMessage.push(errorObject.errors.parent_id);
                if (errorObject.errors.title) errorMessage.push(errorObject.errors.title);
                if (errorObject.errors.link) errorMessage.push(errorObject.errors.link);
                if (errorObject.errors.image) errorMessage.push(errorObject.errors.image);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}