import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                         from '@angular/common';

import { News }                             from '../shared/news.model';
import { NewsService }                      from '../shared/news.service';
import { API_IMAGE_NEWS }                   from '../../shared/app.settings';

@Component({
    selector: 'app-news-datail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private newsService: NewsService,
        private location: Location
    ) {}

    news: News;
    error: string | Array<string>;
    newsImagesUrl: string = API_IMAGE_NEWS;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.newsService.getOneNews(id).subscribe(
                result => this.news = result,
                error => this.error = error
            );
        });
    }
    
    goBack() {
        this.location.back();
    }
}