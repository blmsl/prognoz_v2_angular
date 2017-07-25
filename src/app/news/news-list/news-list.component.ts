import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute, Params }           from '@angular/router';

import { environment }                      from '../../../environments/environment';
import { News }                             from '../../shared/models/news.model';
import { NewsService }                      from '../shared/news.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService
    ) { }

    currentPage: number;
    errorNews: string | Array<string>;
    news: News[];
    lastPage: number;
    newsImagesUrl: string = environment.apiImageNews;
    noNews: string = 'В базі даних новин не знайдено.';
    path: string = '/news/page/';
    perPage: number;
    spinnerNews: boolean = false;
    total: number;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetData();
            this.spinnerNews = true;
            this.newsService.getNews(params['number']).subscribe(
                result => {
                    if (result) {
                        this.currentPage = result.current_page;
                        this.lastPage = result.last_page;
                        this.perPage = result.per_page;
                        this.total = result.total;
                        this.news = result.data;
                    }
                    this.spinnerNews = false;
                },
                error => {
                    this.errorNews = error;
                    this.spinnerNews = false;
                }
            )
        });
    }

    private resetData() {
        this.news = null;
        this.errorNews = null;
    }
}
