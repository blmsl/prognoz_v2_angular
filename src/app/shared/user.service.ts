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
        this.sharedUser$ = new Observable(observer => {
            this.sharedUserObserver = observer;
        }).share();
    }

    private tokenExists = false;

    public sharedUser$: Observable<any>;
    private sharedUserObserver: any;
    private sharedUser: boolean | Object;

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
     * Update token if exists, logout when error occurs
     */
    initializeUser() {
        if (this.isTokenInLocalStorage()) {
            this.refreshUserData()
                .subscribe(
                    response => {
                        this.setTokenToLocalStorage(response.token);
                        this.setUserToLocalStorage(JSON.stringify(response.currentUser));
                        if (response.roles) {
                            this.setRolesToLocalStorage(JSON.stringify(response.roles));
                        } else {
                            this.removeRolesFromLocalStorage();
                        }
                    },
                    error => this.logout()
                );
        } else {
            this.logout();
        }
    }

    /**
     * logout method
     */
    logout() {
        this.removeTokenFromLocalStorage();
        this.removeUserFromLocalStorage();
        this.removeRolesFromLocalStorage();
        this.tokenExists = false;
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
     * remove token from localStorage
     */
    private removeTokenFromLocalStorage() {
        localStorage.removeItem('auth_token');
    }

    /**
     * remove user profile data from localStorage
     */
    private removeUserFromLocalStorage() {
        localStorage.removeItem('user');
    }

    /**
     * remove user roles from localStorage
     */
    private removeRolesFromLocalStorage() {
        localStorage.removeItem('roles');
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
            switch (errorObject.status_code) {
                case 401:
                    errorMessage.push(errorObject.message);
                    break;
                case 404:
                    errorMessage.push(errorObject.message);
                    break;
                case 422:
                    if (errorObject.errors.name) errorMessage.push(errorObject.errors.name);
                    if (errorObject.errors.password) errorMessage.push(errorObject.errors.password);
                    if (errorObject.errors.email) errorMessage.push(errorObject.errors.email);
                    break;
                case 500:
                    errorMessage.push('Помилка сервера');
                    break;
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
        //return Observable.throw(error);
    }

    /**
     * get user profile data from rest(currently dont need)
     *
     * @returns {Observable<R>}
     */
    getUserData() {
        return this.headersWithToken.get(API_URL + 'auth/user')
            .map(response => response.json().user)
            .catch(this.handleError);
    }
}