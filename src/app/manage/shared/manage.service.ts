import { Injectable }       from '@angular/core';
import { Http }             from '@angular/http';

import { API_URL }          from '../../shared/app.settings';
import { HeadersWithToken } from '../../shared/headers-with-token.service';

@Injectable()
export class ManageService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    managePageGuard() {
        return this.headersWithToken.get(API_URL + 'guard/manage')
            .map(response => response.ok);
    }
}