import { Injectable }                        from '@angular/core';
import { Http, Response, URLSearchParams }   from '@angular/http';
import { Observable }                        from 'rxjs/Observable';

import { API_URL }          from '../../shared/app.settings';
import { News }             from './news.model';
import { HeadersWithToken } from '../../shared/headers-with-token.service';

@Injectable()
export class NewsService {
    
    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken) { }
    
    id: number;
    private newsUrl = API_URL + 'news';

    getNews(page = '1'): Observable<any> {
        let params = new URLSearchParams();
        params.set('page', page);
        return this.http.get(this.newsUrl, {search: params})
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getOneNews(id): Observable<News> {
        return this.http
            .get(this.newsUrl + "/" + id)
            .map(response => response.json().news)
            .catch(this.handleError);
    }

    //TODO: move to manage-news.service
    delete(id: number): Observable<void> {
        const url = `${this.newsUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .map(response => response)
            .catch(this.handleError);
    }

    //TODO: move to manage-news.service
    update(news: News): Observable<News> {
        const url = `${this.newsUrl}/${news.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(news))
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    //TODO: move to manage-news.service
    create(title: string, body: string, image: string, tournament_id: number): Observable<News> {
        let data = JSON.stringify({title: title, body: body, image: image, tournament_id: tournament_id});
        return this.headersWithToken
            .post(this.newsUrl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        if (res && res.status !== 204) {
            let body = res.json();
            return body || {};
        }

        return {};
    }
    
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
