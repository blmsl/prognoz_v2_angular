import { Injectable }               from '@angular/core';
import { Http, Headers, Response }  from '@angular/http';
import { Observable }               from 'rxjs/Observable';

import { HeadersWithToken }         from './headers-with-token.service';
import { User }                     from '../shared/models/user.model';
import { environment }              from '../../environments/environment';

@Injectable()
export class AuthService {
    
    constructor(
        private headersWithToken: HeadersWithToken,
        private http: Http
    ){
        this.getUser = new Observable(observer => {
            this.userObserver = observer;
        }).share();
    }

    private authUrl = environment.API_URL + 'auth/';
    
    public getUser: Observable<any>;
    private userObserver: any;

    /**
     * Update user data if token and old user data is present in localStorage.
     * If response error happens, it will clear user data and roles.
     */
    initializeUser() {
        if (this.isUserAndTokenInLocalStorage()) {
                this.refresh().subscribe(
                    response => {
                        this.updateUserInLocalStorage(response.user);
                        this.updateRolesInLocalStorage(response.roles);
                        this.userObserver.next(response.user);
                    },
                    error => {
                        this.updateUserInLocalStorage();
                        this.updateRolesInLocalStorage();
                    }
                );
        }
    }

    /**
     * Sign in request
     * @param name
     * @param password
     * @returns {any|Promise<R>|Promise<ErrorObservable>|Promise<ErrorObservable|T>|Maybe<T>}
     */
    signIn(name, password): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(this.authUrl + 'signin', JSON.stringify({name, password}), {headers})
            .map(response => response.json())
            .map((response) => {
                if (response.token) {
                    this.setTokenToLocalStorage(response.token);
                    this.updateUserInLocalStorage(response.user);
                    this.updateRolesInLocalStorage(response.roles);
                    this.userObserver.next(response.user);
                }
                return response.user;
            })
            .catch(this.handleError);
    }

    /**
     * Sends unvalidate token request
     * @returns {any|Promise<R>|Promise<ErrorObservable>|Promise<ErrorObservable|T>|Maybe<T>}
     */
    logout(): Observable<any> {
        return this.headersWithToken.post(this.authUrl + 'logout', {})
            .map(response => response.json())
            .map((response) => {
                localStorage.clear();
                this.userObserver.next(null);
                return response;
            })
            .catch(this.handleError);
    }

    /**
     * Sends registration request
     * @param user
     * @returns {any|Promise<ErrorObservable|T>|Maybe<T>|Promise<ErrorObservable>|Promise<R>}
     */
    signUp(user: User): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(this.authUrl + 'signup', JSON.stringify(user), {headers})
            .map(response=> response.json())
            .map((response) => {
                if (response.token) {
                    this.setTokenToLocalStorage(response.token);
                    this.updateUserInLocalStorage(response.user);
                    this.userObserver.next(response.user);
                }
                return response.user;
            })
            .catch(this.handleError);
    }

    /**
     * Sends recovery request
     * @param email
     * @returns {Observable<R|T>}
     */
    recovery(email: string): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(this.authUrl + 'recovery', JSON.stringify({email: email}), {headers})
            .map(response => response)
            .catch(this.handleError);
    }

    /**
     * Refresh user data request (by token)
     * @returns {any|Promise<R>|Promise<ErrorObservable>|Promise<ErrorObservable|T>|Maybe<T>}
     */
    private refresh(): Observable<any> {
        return this.headersWithToken.get(this.authUrl + 'refresh')
            .map(response => response.json())
            .catch(this.handleError);
    }

    /**
     * Check if token and user data exists in localStorage
     * @returns {boolean}
     */
    private isUserAndTokenInLocalStorage() {
        return !!localStorage.getItem('auth_token') && !!localStorage.getItem('user');
    }

    /**
     * Update user data in localStorage
     * or remove it if function has no arguments
     * @param user
     */
    private updateUserInLocalStorage(user?: any) {
        if (!!user) {
            localStorage.setItem('user', JSON.stringify(user));    
        } else {
            localStorage.removeItem('user');
        }
    }

    /**
     * Update roles array in localStorage
     * or remove it if function has no arguments
     * @param roles
     */
    private updateRolesInLocalStorage(roles?: Array<string>) {
        if (!!roles) {
            localStorage.setItem('roles', JSON.stringify(roles));    
        } else {
            localStorage.removeItem('roles');    
        }
    }

    /**
     * Set token to localStorage
     * @param token
     */
    private setTokenToLocalStorage(token) {
        localStorage.setItem('auth_token', token);
    }
    
    // TODO: refactor this, and all handleError methods
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