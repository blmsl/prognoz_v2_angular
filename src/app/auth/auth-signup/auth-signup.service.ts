import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { API_URL }          from '../../shared/app.setings';

@Injectable()
export class AuthSignupService {

    constructor(
        private http: Http
    ) {}

    signup(user): Observable<any> {
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
            });
    }

    private setTokenToLocalStorage(token) {
        localStorage.setItem('auth_token', token);
    }

    private setUserToLocalStorage(user) {
        localStorage.setItem('user', user);
    }
}
