import { Injectable }       from '@angular/core';
import { Http, Response }   from '@angular/http';
import { Observable }       from 'rxjs/Observable';

import { API_URL }          from '../../shared/app.setings';
import { News }             from './news.model';
import { HeadersWithToken } from '../../shared/headers-with-token.service';

@Injectable()
export class NewsService {
    
    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken) { }
    
    id: number;
    private newsUrl = API_URL + 'news';

    getNews(): Observable<News[]> {
        return this.http.get(this.newsUrl)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    getOneNews(id): Observable<News> {
        return this.http
            .get(this.newsUrl + "/" + id)
            .map(this.extractData)
            .catch(this.handleError);
    }
    
    delete(id: number): Observable<void> {
        const url = `${this.newsUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    update(news: News): Observable<News> {
        const url = `${this.newsUrl}/${news.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(news))
            .map(this.extractData)
            .catch(this.handleError);
    }

    create(title: string, body: string, image: string, tournament_id: number): Observable<News> {
        let data = JSON.stringify({title: title, body: body, image: image, tournament_id: tournament_id});
        return this.headersWithToken
            .post(this.newsUrl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.news || { };
    }
    
    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg);
        return Observable.throw(errMsg);
    }
}
