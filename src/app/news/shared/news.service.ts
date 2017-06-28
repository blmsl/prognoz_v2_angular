import { Injectable }                        from '@angular/core';
import { Http, URLSearchParams }             from '@angular/http';
import { Observable }                        from 'rxjs/Observable';

import { ErrorHandlerService }               from '../../shared/error-handler.service';
import { HeadersWithToken }                  from '../../shared/headers-with-token.service';
import { News }                              from '../../shared/models/news.model'; 
import { environment }                       from '../../../environments/environment';

@Injectable()
export class NewsService {
    
    constructor(
        private http: Http,
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken
    ) {}
    
    private newsUrl = environment.API_URL + 'news';

    /**
     * Get all paginated news
     * @param page
     * @returns {Observable<any>}
     */
    getNews(page = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http
            .get(this.newsUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get one
     * @param id
     * @returns {Observable<News>}
     */
    getOneNews(id): Observable<News> {
        return this.http
            .get(this.newsUrl + "/" + id)
            .map(response => response.json().news)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Delete one news
     * @param id
     * @returns {Observable<void>}
     */
    delete(id: number): Observable<void> {
        const url = `${this.newsUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create one news
     * @param news
     * @returns {Observable<News>}
     */
    create(news: News): Observable<News> {
        return this.headersWithToken
            .post(this.newsUrl, news)
            .map(response => response.json().news)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update one news
     *
     * @param news
     * @returns {Observable<News>}
     */
    update(news: News): Observable<News> {
        const url = `${this.newsUrl}/${news.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(news))
            .map(response => response.json().news)
            .catch(this.errorHandlerService.handle);
    }
}
