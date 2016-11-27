import { Injectable }                        from '@angular/core';
import { Http, Response, URLSearchParams }   from '@angular/http';
import { Observable }                        from 'rxjs/Observable';

import { API_URL }                           from '../../shared/app.settings';
import { News }                              from './news.model';

@Injectable()
export class NewsService {
    
    constructor(
        private http: Http
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
        return this.http.get(this.newsUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Get one
     *
     * @param id
     * @returns {Observable<R>}
     */
    getOneNews(id): Observable<News> {
        return this.http
            .get(this.newsUrl + "/" + id)
            .map(response => response.json().news)
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
        return {};
    }

    /**
     * Error handling
     *
     * @param error
     * @returns {ErrorObservable}
     */
    private handleError(error: Response | any) {
        let errorObject: any;
        let errorMessage: Array<any> = [];
        if (error instanceof Response) {
            errorObject = error.json();
            errorMessage.push(errorObject.message);
        } else {
            errorMessage.push('Невідома помилка');
        }
        return Observable.throw(errorMessage);
    }
}
