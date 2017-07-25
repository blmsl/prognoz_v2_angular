import { Injectable }               from '@angular/core';
import { Http, URLSearchParams }    from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '../../environments/environment';
import { ErrorHandlerService }      from './error-handler.service';
import { HeadersWithToken }         from './headers-with-token.service';
import { User }                     from '../shared/models/user.model';

@Injectable()

export class UserService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ){ }

    private usersUrl = environment.apiUrl + 'users';

    /**
     * Get users
     * @param order
     * @param limit
     * @param sequence
     * @returns {Observable<any>}
     */
    getUsers(limit?: number, order?: string, sequence?: string): Observable<any> {
        let params = new URLSearchParams();
        if (limit) params.set('limit', limit.toString());
        if (order) params.set('order', order);
        if (sequence) params.set('sequence', sequence);
        return this.http
            .get(this.usersUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get user by id
     * @param id
     * @returns {Observable<User>}
     */
    getUser(id: number): Observable<User> {
        return this.http
            .get(`${this.usersUrl}/${id}`)
            .map(response => response.json().user)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update user profile data
     * @param user
     * @returns {Observable<User>}
     */
    updateUser(user: User): Observable<User> {
        return this.headersWithToken
            .put(`${this.usersUrl}/${user.id}`, user)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }
}