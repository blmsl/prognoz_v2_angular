import { Component, OnInit } from '@angular/core';
import { Router, Params } from '@angular/router';

import { News } from '../shared/news.model';
import { NewsService } from '../shared/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {
    title = 'news-list component works!';
    news: News[];

    constructor(
        private router: Router,
        private newsService: NewsService
    ) { }

    ngOnInit() {
        this.newsService.getNews().then(news => this.news = news);
    }
    
    onSelect(news: News) {
        this.router.navigate(['/news', news.id]);
    }
}
