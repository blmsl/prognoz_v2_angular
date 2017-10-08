import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params }         from '@angular/router';

import { NotificationsService }           from 'angular2-notifications';
import { News }                           from '../../../shared/models/news.model';
import { NewsService }                    from '../../../news/shared/news.service';

@Component({
  selector: 'app-news-table',
  templateUrl: './news-table.component.html',
  styleUrls: ['./news-table.component.css']
})
export class NewsTableComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationsService,
        private newsService: NewsService
    ) { }

    cancelClicked: boolean = false;
    confirmClicked: boolean = false;
    currentPage: number;
    errorNews: string | Array<string>;
    news: News[];
    lastPage: number;
    message: string = 'Ви дійсно бажаєте видалити';
    path: string = '/manage/news/page/';
    perPage: number;
    title: string = 'Підтвердження';
    total: number;

    deleteNewsItem(news: News) {
        this.newsService.deleteNewsItem(news.id).subscribe(
            response => {
                this.total--;
                this.news = this.news.filter(n => n !== news);
                this.notificationService.success('Успішно', news.title + ' видалено');
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
            }
        );
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
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
