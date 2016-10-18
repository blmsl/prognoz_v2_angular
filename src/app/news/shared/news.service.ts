import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';

import { News } from './news.model';

@Injectable()
export class NewsService {

    id: number;
    private newsUrl = 'http://prognoz-rest.local/api/v1/news';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getNews(): Promise<News[]> {
        return this.http.get(this.newsUrl)
            .toPromise()
            .then(response => response.json().news as News[]);
    }

    getOneNews(id): Promise<News> {
        return this.http.get(this.newsUrl + "/" + id)
            .toPromise()
            .then(response => response.json().news as News);
    }
    
    delete(id: number): Promise<void> {
        const url = `${this.newsUrl}/${id}`;
        return this.http.delete(url, {headers: this.headers})
            .toPromise()
            .then(() => null);
    }

    update(news: News): Promise<News> {
        const url = `${this.newsUrl}/${news.id}`;
        return this.http.put(url, JSON.stringify(news), {headers: this.headers})
            .toPromise()
            .then(() => news);
    }

    create(title: string, body: string, image: string, tournament_id: number): Promise<News> {
        return this.http.post(this.newsUrl, JSON.stringify({title: title, body: body, image: image, tournament_id: tournament_id}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().news);
    }

}
