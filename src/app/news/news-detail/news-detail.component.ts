import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { News }         from '../shared/news.model';
import { NewsService }  from '../shared/news.service';

@Component({
    selector: 'app-news-datail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit {
    title = 'news-detail component works!';
    news: News;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private newsService: NewsService
    ) {}
    
    ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id = +params['id'];
            this.newsService.getOneNews(id).then(news => this.news = news);
        });
    }

    gotoNewsList() {
        this.router.navigate(['/news']);
    }

}