import { Injectable }               from '@angular/core';
import { Http }                     from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { environment }              from '../../environments/environment';
import { ErrorHandlerService }      from './error-handler.service';
import { HeadersWithToken }         from './headers-with-token.service';

@Injectable()

export class UserService {

    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ){ }

    /**
     * Update user profile data
     * @param value
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<R>|Promise<ErrorObservable<T>>}
     */
    update(value): Observable<void> {
        return this.headersWithToken.put(environment.apiUrl + 'user/' + value.id, value)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get last registered user
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>}
     */
    getLastUser() {
        return this.http
            .get(environment.apiUrl + "users?last=true")
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get user by id
     * @param id
     * @param competitionId
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>>|Promise<ErrorObservable<T>|T>}
     */
    getUser(id: number, competitionId: number = null) {
        let url = environment.apiUrl + 'users/' + id;
        return this.http
            .get(url)
            .map(response => response.json().user)
            .catch(this.errorHandlerService.handle);
    }
}