import { Injectable }       from '@angular/core';
import { Headers, Http }    from '@angular/http';

import { News } from './news.model';

@Injectable()
export class NewsService {
    private newsUrl = 'http://prognoz-rest.local/api/v1/news';
    private headers = new Headers({'Content-Type': 'application/json'});

    constructor(private http: Http) { }

    getNews(): Promise<News[]> {
        return this.http.get(this.newsUrl)
            .toPromise()
            .then(response => response.json() as News[]);
    }

}
