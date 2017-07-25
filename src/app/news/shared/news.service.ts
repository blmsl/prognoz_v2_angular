import { Injectable }                        from '@angular/core';
import { Http, URLSearchParams }             from '@angular/http';
import { Observable }                        from 'rxjs/Observable';

import { environment }                       from '../../../environments/environment';
import { ErrorHandlerService }               from '../../core/error-handler.service';
import { HeadersWithToken }                  from '../../core/headers-with-token.service';
import { News }                              from '../../shared/models/news.model'; 

@Injectable()

export class NewsService {
    
    constructor(
        private errorHandlerService: ErrorHandlerService,
        private headersWithToken: HeadersWithToken,
        private http: Http
    ) {}
    
    private newsUrl = environment.apiUrl + 'news';

    /**
     * Get all paginated news
     * @param page
     * @returns {Observable<any>}
     */
    getNews(page: number = 1): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page.toString());
        return this.http
            .get(this.newsUrl, {search: params})
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Get one news item
     * @param id
     * @returns {Observable<News>}
     */
    getNewsItem(id: number): Observable<News> {
        return this.http
            .get(`${this.newsUrl}/${id}`)
            .map(response => response.json().news)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Delete one news item
     * @param id
     * @returns {Observable<void>}
     */
    deleteNewsItem(id: number): Observable<void> {
        return this.headersWithToken
            .delete(`${this.newsUrl}/${id}`)
            .map(response => response.json())
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Create one news item
     * @param news
     * @returns {Observable<News>}
     */
    createNewsItem(news: News): Observable<News> {
        return this.headersWithToken
            .post(this.newsUrl, news)
            .map(response => response.json().news)
            .catch(this.errorHandlerService.handle);
    }

    /**
     * Update one news item
     * @param news
     * @returns {Observable<News>}
     */
    updateNewsItem(news: News): Observable<News> {
        return this.headersWithToken
            .put(`${this.newsUrl}/${news.id}`, JSON.stringify(news))
            .map(response => response.json().news)
            .catch(this.errorHandlerService.handle);
    }
}
