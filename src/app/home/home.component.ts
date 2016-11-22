import { Component, OnInit } from '@angular/core';

import { NewsService }       from '../news/shared/news.service';
import { News }              from '../news/shared/news.model';

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
