import { Injectable }                        from '@angular/core';
import { Http, Response, URLSearchParams }   from '@angular/http';
import { Observable }                        from 'rxjs/Observable';

import { HeadersWithToken }                  from '../../shared/headers-with-token.service';
import { News }                              from '../../shared/models/news.model'; 
import { environment }                       from '../../../environments/environment';

@Injectable()
export class NewsService {
    
    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken
    ) {}
    
    private newsUrl = environment.API_URL + 'news';

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
     * Delete one news
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
     * Create one news
     *
     * @param news
     * @returns {Observable<R>}
     */
    create(news: News): Observable<News> {
        return this.headersWithToken
            .post(this.newsUrl, news)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * Update one news
     *
     * @param news
     * @returns {Observable<R>}
     */
    update(news: News): Observable<News> {
        const url = `${this.newsUrl}/${news.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(news))
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
            if (body.news) body = body.news;
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
            if (errorObject.status_code !== 422) {
                errorMessage.push(errorObject.message);
            } else {
                if (errorObject.errors.title) errorMessage.push(errorObject.errors.title);
                if (errorObject.errors.body) errorMessage.push(errorObject.errors.body);
                if (errorObject.errors.image) errorMessage.push(errorObject.errors.image);
                if (errorObject.errors.tournament_id) errorMessage.push(errorObject.errors.tournament_id);
            }
        } else {
            errorMessage.push('Невідома помилка');
        }

        return Observable.throw(errorMessage);
    }
}
