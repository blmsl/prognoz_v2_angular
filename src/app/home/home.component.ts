import { Component, OnInit }    from '@angular/core';

import { NewsService }          from '../news/shared/news.service';
import { News }                 from '../news/shared/news.model';
import { API_IMAGE_NEWS }       from '../shared/app.settings';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(
        private newsService: NewsService
    ) { }

    error: string | Array<string>;
    news: News[];
    newsImagesUrl: string = API_IMAGE_NEWS;

    ngOnInit() {
        this.newsService.getNews().subscribe(
            result => {
                if (!result.data) {
                    this.error = "В базі даних новин немає";
                } else {
                    this.news = result.data;
                }
            },
            error => this.error = error
        );
    }
}
