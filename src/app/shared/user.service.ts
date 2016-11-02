import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { API_URL }          from './app.setings';
import { HeadersWithToken } from './headers-with-token.service';

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
    
    addSharedUser(value: boolean | Object) {
        this.sharedUser = value;
        this.sharedUserObserver.next(this.sharedUser);
    }
    
    loadSharedUser() {
        this.sharedUserObserver.next(this.sharedUser);
    }

    login(name, password): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(API_URL + 'auth/signin', JSON.stringify({name, password}), {headers})
            .map(res => res.json())
            .map((res) => {
                if (res.token) {
                    this.setTokenToLocalStorage(res.token);
                    this.setUserToLocalStorage(JSON.stringify(res.currentUser));
                    this.tokenExists = true;
                }
                return res.currentUser;
            });
    }

    initializeUser() {
        if (this.isTokenInLocalStorage()) {
            this.refreshUserData()
                .subscribe(
                    response => {
                        this.setTokenToLocalStorage(response.token);
                        this.setUserToLocalStorage(JSON.stringify(response.user));
                    },
                    error => this.logout()
                );
        } else {
            this.logout();
        }
    }

    logout() {
        this.removeTokenFromLocalStorage();
        this.removeUserFromLocalStorage();
        this.tokenExists = false;
    }

    isTokenInLocalStorage() {
        return this.tokenExists;
    }

    private refreshUserData() {
        return this.headersWithToken.get(API_URL + 'auth/refresh')
            .map(response => response.json())
            .catch(this.handleError);
    }

    private setTokenToLocalStorage(token) {
        localStorage.setItem('auth_token', token);
    }

    private setUserToLocalStorage(user) {
        localStorage.setItem('user', user);
    }

    private removeTokenFromLocalStorage() {
        localStorage.removeItem('auth_token');
    }

    private removeUserFromLocalStorage() {
        localStorage.removeItem('user');
    }

    private handleError(error: any) {
        return Observable.throw(error);
    }

    getUserData() {
        return this.headersWithToken.get(API_URL + 'auth/user')
            .map(response => response.json().user)
            .catch(this.handleError);
    }
}