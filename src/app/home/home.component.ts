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

    title = 'home component works!';
    news: News[];

    ngOnInit() {
        this.newsService.getNews().subscribe(result => {
            let response = result.json();
            this.news = response.data;
        });
    }
}
