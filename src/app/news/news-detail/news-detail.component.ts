import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, Params }   from '@angular/router';
import { Location }                         from '@angular/common';
import { NotificationsService }             from 'angular2-notifications';

import { News }                             from '../shared/news.model';
import { NewsService }                      from '../shared/news.service';
import { UserService }                      from '../../shared/user.service';
import { CommentService }                   from '../../shared/comment.service';
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
        private location: Location,
        private userService: UserService,
        private commentService: CommentService,
        private notificationService: NotificationsService
    ) {}

    news: News;
    error: string | Array<string>;
    newsImagesUrl: string = API_IMAGE_NEWS;
    authenticatedUser: any;
    preloader: boolean = false;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.newsService.getOneNews(id).subscribe(
                result => this.news = result,
                error => this.error = error
            );
        });
        this.authenticatedUser = this.userService.sharedUser;
    }
    
    goBack() {
        this.location.back();
    }
    
    onSubmit(value, valid) {
        this.preloader = true;
        this.commentService.create(value.value).subscribe(
            response => {
                this.news.comments = response.comments;
                this.notificationService.success('Успішно', 'Комеентар додано');
                this.preloader = false;
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
                this.preloader = false;
            }
        );
    }
}