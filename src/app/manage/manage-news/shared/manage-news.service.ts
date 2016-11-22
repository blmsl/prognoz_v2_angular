import { Injectable }                       from '@angular/core';
import { Http, Response, URLSearchParams  } from '@angular/http';
import { Observable }                       from 'rxjs/Observable';

import { API_URL }                          from '../../../shared/app.settings';
import { HeadersWithToken }                 from '../../../shared/headers-with-token.service';

@Injectable()

export class ManageNewsService {

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}

    private newsUrl = API_URL + 'news';

    /**
     * Get all paginated news
     *
     * @param page
     * @returns {Observable<R>}
     */
    getNews(page = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http
            .get(this.newsUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Delete one
     *
     * @param id
     * @returns {Observable<R>}
     */
    delete(id: number): Observable<void> {
        const url = `${this.newsUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .map(this.extractData)
            .catch(this.handleError);
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
            return body || {};
        }
        
        return res;
    }

    //TODO: do better error handling
    private handleError(error: Response | any) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            errorObject = error.json();
            switch (errorObject.status_code) {
                case 401:
                    errorMessage.push(errorObject.message);
                    break;
                case 403:
                    errorMessage.push(errorObject.message);
                    break;
                case 404:
                    errorMessage.push(errorObject.message);
                    break;
                //         case 422:
                //             //if (errorObject.errors.name) errorMessage.push(errorObject.errors.name);
                //             //if (errorObject.errors.password) errorMessage.push(errorObject.errors.password);
                //             //if (errorObject.errors.email) errorMessage.push(errorObject.errors.email);
                //             break;
                case 500:
                    errorMessage.push(errorObject.message);
                    break;
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}