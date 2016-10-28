import { Component, Input, OnInit }         from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                         from '@angular/common';

import { News }         from '../shared/news.model';
import { NewsService }  from '../shared/news.service';

@Component({
    selector: 'app-news-datail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private newsService: NewsService,
        private location: Location
    ) {}

    title = 'news-detail component works!';
    news: News;
    errorMessage: string;

    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.newsService.getOneNews(id)
                .subscribe(news => this.news = news);
        });
    }

    gotoNewsList() {
        this.router.navigate(['/news']);
    }

    goBack() {
        this.location.back();
    }
    
    save() {
        this.newsService.update(this.news)
            .subscribe(
                res => this.goBack(),
                error => this.errorMessage = <any>error.json().errors
            );
    }

}