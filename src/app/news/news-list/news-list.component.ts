import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';

import { News }         from '../shared/news.model';
import { NewsService }  from '../shared/news.service';

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
    errorMessage: string; //TODO: delete
    error: string | Array<string>;

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
    
    onSelect(news: News) {
        this.router.navigate(['/news', news.id]);
    }
    
    //TODO: replace to admin-news-delete controller 
    delete(news: News) {
        this.newsService.delete(news.id)
            .subscribe(
                response => {
                    this.news = this.news.filter(n => n !== news);
                },
                error => this.errorMessage = <any>error.json().message
            );
    }
    
    pageChanged(event) {
        this.router.navigate(['/news/page', event]);
    }
}
