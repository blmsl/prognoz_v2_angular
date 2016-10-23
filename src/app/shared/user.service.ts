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


    login(email, password) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post(API_URL + 'auth/login', JSON.stringify({ email, password}), { headers })
            .map(res =>res.json())
            .map((res) => {
                if (res.token) {
                // TODO: if (res.success) {
                    // TODO: delete line - console.log('success in userService login method!');
                    localStorage.setItem('auth_token', res.token);
                    this.loggedIn = true;
                }
                // TODO: return res.success;
                return res.token;
            });
    }

    logout() {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        this.loggedIn = false;
    }

    isLoggedIn() {
        return this.loggedIn;
    }

    getUserData() {
        return this.headersWithToken.get(API_URL + 'auth/user')
            .map(response => response.json().user)
            .catch(this.handleError);
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

    reloadUserData() {
        if (this.isLoggedIn()) {
            this.getUserData().subscribe(user => {
                localStorage.setItem('user', JSON.stringify(user));
            });
        } else {
            this.logout();
        }
    }
}