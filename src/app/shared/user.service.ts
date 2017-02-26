import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { API_URL }                  from './app.settings';
import { HeadersWithToken }         from './headers-with-token.service';

@Injectable()
export class UserService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ){
        this.tokenExists = !!localStorage.getItem('auth_token');
        this.sharedUser = JSON.parse(localStorage.getItem('user'));
        //this.sharedUser = null;
        this.sharedUser$ = new Observable(observer => {
            this.sharedUserObserver = observer;
        }).share();
    }

    private tokenExists = false;

    public sharedUser$: Observable<any>;
    private sharedUserObserver: any;
    public sharedUser: boolean | Object;

    /**
     * adds user data to this.sharedUser property
     *
     * @param value
     */
    addSharedUser(value: boolean | Object) {
        this.sharedUser = value;
        this.sharedUserObserver.next(this.sharedUser);
    }

    /**
     * watchs for changes in this.sharedUser property
     */
    loadSharedUser() {
        this.sharedUserObserver.next(this.sharedUser);
    }

    /**
     * User authentication
     *
     * @param name
     * @param password
     * @returns {Observable<R>}
     */
    login(name, password): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(API_URL + 'auth/signin', JSON.stringify({name, password}), {headers})
            .map(res => res.json())
            .map((res) => {
                if (res.token) {
                    this.setTokenToLocalStorage(res.token);
                    this.setUserToLocalStorage(JSON.stringify(res.currentUser));
                    if (res.roles) this.setRolesToLocalStorage(JSON.stringify(res.roles));
                    this.tokenExists = true;
                }
                return res.currentUser;
            })
            .catch(this.handleError);
    }

    /**
     * User registration
     *
     * @param user
     * @returns {Observable<R>}
     */
    registration(user): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(API_URL + 'auth/signup', JSON.stringify(user), {headers})
            .map(result => result.json())
            .map((result) => {
                if (result.token) {
                    this.setTokenToLocalStorage(result.token);
                    this.setUserToLocalStorage(JSON.stringify(result.currentUser));
                }
                return result.currentUser;
            })
            .catch(this.handleError);
    }

    /**
     * User password recovery
     *
     * @param email
     * @returns {Observable<R>}
     */
    recovery(email): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(API_URL + 'auth/recovery', JSON.stringify({email: email}), {headers})
            .map(response => response)
            .catch(this.handleError);
    }

    /**
     * User password reset
     * 
     * @param resetForm
     * @returns {Observable<R>}
     */
    reset(resetForm): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(API_URL + 'auth/reset', JSON.stringify(resetForm), {headers})
            .map(response => response)
            .catch(this.handleError);
    }

    /**
     * Update user profile data
     *
     * @param value
     * @returns {Promise<ErrorObservable<T>|T>|any|Promise<R>|Promise<ErrorObservable<T>>}
     */
    update(value): Observable<any> {
        return this.headersWithToken.put(API_URL + 'user/' + value.id, value)
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Update user if exists, logout when error occurs
     */
    initializeUser() {
        if (this.isTokenInLocalStorage()) {
            this.refreshUserData()
                .subscribe(
                    response => {
                        this.addSharedUser(response.currentUser);
                        this.setUserToLocalStorage(JSON.stringify(response.currentUser));
                        if (response.roles) {
                            this.setRolesToLocalStorage(JSON.stringify(response.roles));
                        } else {
                            this.removeRolesFromLocalStorage();
                        }
                    },
                    error => {
                        this.addSharedUser(false);
                        this.logout();
                    }
                );
        } else {
            this.logout();
        }
    }

    /**
     * logout method
     */
    logout() {
        localStorage.clear();
        this.tokenExists = false;
    }

    /**
     * invalidate token
     *
     * @returns {any|Promise<ErrorObservable<T>|T>|Promise<R>|Promise<ErrorObservable<T>>}
     */
    logoutRequest() {
        return this.headersWithToken.post(API_URL + 'auth/logout', {})
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * check if 'auth_token' exists in localStorage
     *
     * @returns {boolean}
     */
    isTokenInLocalStorage() {
        return this.tokenExists;
    }

    /**
     * Refresh user profile data & token
     *
     * @returns {Observable<R>}
     */
    private refreshUserData() {
        return this.headersWithToken.get(API_URL + 'auth/refresh')
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * get last registered user
     *
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>|T>|Promise<ErrorObservable<T>>}
     */
    getLastUser() {
        return this.http
            .get(API_URL + "users?last=true")
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Get user by id
     *
     * @param id
     * @returns {Promise<R>|any|Promise<ErrorObservable<T>>|Promise<ErrorObservable<T>|T>}
     */
    getUser(id: number) {
        return this.http
            .get(API_URL + 'users/' + id)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * set token to localStorage
     *
     * @param token
     */
    private setTokenToLocalStorage(token) {
        localStorage.setItem('auth_token', token);
    }

    /**
     * set user profile data to localStorage
     *
     * @param user
     */
    private setUserToLocalStorage(user) {
        localStorage.setItem('user', user);
    }

    /**
     * set user roles to localStorage
     *
     * @param roles
     */
    private setRolesToLocalStorage(roles) {
        localStorage.setItem('roles', roles)
    }

    /**
     * remove user roles from localStorage
     */
    private removeRolesFromLocalStorage() {
        localStorage.removeItem('roles');
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