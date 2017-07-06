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

    news: News[];
    errorNews: string | Array<string>;
    spinnerNews: boolean = false;
    noNews: string = 'В базі даних новин не знайдено.';

    path: string = '/manage/news/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    title: string = 'Підтвердження';
    message: string = 'Ви дійсно бажаєте видалити';
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;

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
                    }
                    this.news = result ? result.data : [];
                    this.spinnerNews = false;
                },
                error => {
                    this.errorNews = error;
                    this.spinnerNews = false;
                }
            )
        });
    }

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

    private resetData() {
        this.news = null;
        this.errorNews = null;
    }
}
