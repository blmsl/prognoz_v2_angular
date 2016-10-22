import { Injectable }       from '@angular/core';
import { Http }    from '@angular/http';

import { News } from './news.model';
import { HeadersWithToken } from '../../shared/headers-with-token.service';

@Injectable()
export class NewsService {

    id: number;
    private newsUrl = 'http://prognoz-rest.local/api/news';

    constructor(
        private http: Http,
        private headersWithToken: HeadersWithToken) { }

    getNews(): Promise<News[]> {
        return this.headersWithToken
            .get(this.newsUrl)
            .toPromise()
            .then(response => response.json().news as News[])
            .catch(this.handleError);
    }

    getOneNews(id): Promise<News> {
        return this.http
            .get(this.newsUrl + "/" + id)
            .toPromise()
            .then(response => response.json().news as News);
    }
    
    delete(id: number): Promise<void> {
        const url = `${this.newsUrl}/${id}`;
        return this.headersWithToken
            .delete(url)
            .toPromise()
            .then(() => null);
    }

    update(news: News): Promise<News> {
        const url = `${this.newsUrl}/${news.id}`;
        return this.headersWithToken
            .put(url, JSON.stringify(news))
            .toPromise()
            .then(() => news);
    }

    create(title: string, body: string, image: string, tournament_id: number): Promise<News> {
        return this.headersWithToken
            .post(this.newsUrl, JSON.stringify({title: title, body: body, image: image, tournament_id: tournament_id}))
            .toPromise()
            .then(response => response.json().news);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        alert('An error occurred' + error);
        return Promise.reject(error.message || error);
    }

}
