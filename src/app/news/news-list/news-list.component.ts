import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute, Params }           from '@angular/router';

import { News }                             from '../../shared/models/news.model';
import { NewsService }                      from '../shared/news.service';
import { environment }                      from '../../../environments/environment';

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
    
    news: News[];
    error: string | Array<string>;
    newsImagesUrl: string = environment.API_IMAGE_NEWS;
    spinner: boolean = false;
    
    path: string = '/news/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    ngOnInit() {
        this.spinner = true;
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
                    this.spinner = false;
                },
                error => {
                    this.error = error;
                    this.spinner = false;
                }
            )
        });
    }
}
