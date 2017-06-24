import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { HeadersWithToken }         from './headers-with-token.service';
import { environment }              from '../../environments/environment';

@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ){ }

    /**
     * Update user profile data
     * @param value
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<R>|Promise<ErrorObservable<T>>}
     */
    update(value): Observable<any> {
        return this.headersWithToken.put(environment.API_URL + 'user/' + value.id, value)
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Get last registered user
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>}
     */
    getLastUser() {
        return this.http
            .get(environment.API_URL + "users?last=true")
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Get user by id
     * @param id
     * @param competitionId
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>>|Promise<ErrorObservable<T>|T>}
     */
    getUser(id: number, competitionId: number = null) {
        let url = environment.API_URL + 'users/' + id;
        return this.http
            .get(url)
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
            if (body.user) body = body.user;
            if (body.users) body = body.users;
            return body || {};
        }
        return {};
    }

    /**
     * error handling
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
                if (errorObject.errors.name) errorMessage.push(errorObject.errors.name);
                if (errorObject.errors.password) errorMessage.push(errorObject.errors.password);
                if (errorObject.errors.email) errorMessage.push(errorObject.errors.email);
                if (errorObject.errors.first_name) errorMessage.push(errorObject.errors.first_name);
                if (errorObject.errors.hometown) errorMessage.push(errorObject.errors.hometown);
                if (errorObject.errors.favorite_team) errorMessage.push(errorObject.errors.favorite_team);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}