import { Injectable }   from '@angular/core';
import { Http, Headers } from '@angular/http';

import { HeadersWithToken } from './headers-with-token.service';

@Injectable()
export class UserService {
    private loggedIn = false;

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ){
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    login(email, password) {
        let headers = new Headers();
        headers.append('Content-type', 'application/json');
        return this.http
            .post('http://prognoz-rest.local/api/auth/login', JSON.stringify({ email, password}), { headers })
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
        return this.headersWithToken.get('http://prognoz-rest.local/api/auth/user')
            .toPromise()
            .then(response => response.json().user)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        alert('An error occurred' + error);
        return Promise.reject(error.message || error);
    }

    reloadUserData() {
        if (this.isLoggedIn()) {
            this.getUserData().then(user => {
                localStorage.setItem('user', JSON.stringify(user));
            });
        } else {
            this.logout();
        }
    }
}