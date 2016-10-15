import { Component, OnInit } from '@angular/core';

import { News } from '../shared/news.model';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {
    news: News[];

    constructor(private newsService: NewsService) { }

    ngOnInit() {
      this.newsService.getNews().then(news => this.news = news);
    }

}
