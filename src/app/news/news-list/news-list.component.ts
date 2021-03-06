import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute, Params }           from '@angular/router';

import { environment }                      from '../../../environments/environment';
import { News }                             from '../../shared/models/news.model';
import { NewsService }                      from '../shared/news.service';
import { TitleService }                     from '../../core/title.service';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.css']
})

export class NewsListComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService,
        private titleService: TitleService
    ) { }

    currentPage: number;
    errorNews: string | Array<string>;
    news: News[];
    lastPage: number;
    newsImagesUrl: string = environment.apiImageNews;
    path: string = '/news/page/';
    perPage: number;
    total: number;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.titleService.setTitle(`Новини${params['number'] ? ', сторінка ' + params['number'] : ''}`);
            this.newsService.getNews(params['number']).subscribe(
                response => {
                    if (response) {
                        this.currentPage = response.current_page;
                        this.lastPage = response.last_page;
                        this.perPage = response.per_page;
                        this.total = response.total;
                        this.news = response.data;
                    }
                },
                error => {
                    this.errorNews = error;
                }
            );
        });
    }
}
