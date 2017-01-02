import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { News }                             from '../shared/news.model';
import { NewsService }                      from '../shared/news.service';
import { API_IMAGE_NEWS }                   from '../../shared/app.settings';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService
    ) { }
    
    news: News[];
    error: string | Array<string>;
    newsImagesUrl: string = API_IMAGE_NEWS;
    
    path: string = '/news/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.newsService.getNews(params['number']).subscribe(
                result => {
                    if (!result.data) {
                        this.error = "В базі даних новин немає";
                    } else {
                        this.currentPage = result.current_page;
                        this.lastPage = result.last_page;
                        this.perPage = result.per_page;
                        this.total = result.total;
                        this.news = result.data;
                    }
                },
                error => this.error = error
            )
        });
    }
}
