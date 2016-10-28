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
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    private loggedIn = false;

    login(name, password): Observable<any> {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http.post(API_URL + 'auth/signin', JSON.stringify({name, password}), {headers})
            .map(res => res.json())
            .map((res) => {
                if (res.token) {
                    this.setTokenToLocalStorage(res.token);
                    this.setUserToLocalStorage(JSON.stringify(res.currentUser));
                    this.loggedIn = true;
                }
                return res.currentUser;
            });
    }

    initializeUser() {
        if (this.isLoggedIn()) {
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
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    refreshUserData() {
        return this.headersWithToken.get(API_URL + 'auth/refresh')
            .map(response => response.json())
            .catch(this.handleError);
    }

    setTokenToLocalStorage(token) {
        localStorage.setItem('auth_token', token);
    }

    setUserToLocalStorage(user) {
        localStorage.setItem('user', user);
    }

    removeTokenFromLocalStorage() {
        localStorage.removeItem('auth_token');
    }

    removeUserFromLocalStorage() {
        localStorage.removeItem('user');
    }
    
    getUserData() {
        return this.headersWithToken.get(API_URL + 'auth/user')
            .map(response => response.json().user)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        // let errMsg = (error.message) ? error.message :
        //     error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        // console.error(errMsg);
        return Observable.throw(error);
    }
}