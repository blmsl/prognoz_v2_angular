import { Injectable }       from '@angular/core';
import { Http, Headers }    from '@angular/http';
import { Observable }       from 'rxjs/Observable';

@Injectable()
export class HeadersWithToken {
    constructor(private http: Http) {}

    checkTokenExistance(){
        return !!localStorage.getItem('auth_token');
    }

    createAuthorizationHeader(headers: Headers) {
        if(this.checkTokenExistance()) {
            headers.append('Authorization', 'Bearer {' + localStorage.getItem('auth_token') + '}');
        }
    }

    createContentTypeHeader(headers: Headers) {
        headers.append('Content-Type', 'application/json');
    }

    get(url): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        return this.http.get(url, { headers: headers });
    }

    post(url, data): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.createContentTypeHeader(headers);
        return this.http.post(url, data, { headers: headers });
    }
    
    delete(url): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.createContentTypeHeader(headers);
        return this.http.delete(url, { headers: headers });
    }

    put(url, data): Observable<any> {
        let headers = new Headers();
        this.createAuthorizationHeader(headers);
        this.createContentTypeHeader(headers);
        return this.http.put(url, data, { headers: headers });
    }
}