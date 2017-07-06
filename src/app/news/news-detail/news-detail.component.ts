import { Location }                             from '@angular/common';
import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ActivatedRoute, Params }               from '@angular/router';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { CommentService }                       from '../shared/comment.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { environment }                          from '../../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';
import { News }                                 from '../../shared/models/news.model';
import { NewsService }                          from '../shared/news.service';
import { User }                                 from '../../shared/models/user.model';

@Component({
    selector: 'app-news-datail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private commentService: CommentService,
        private currentStateService: CurrentStateService,
        private formBuilder: FormBuilder,
        private location: Location,
        private notificationService: NotificationsService,
        private newsService: NewsService,
    ) {}

    news: News;
    errorNews: string | Array<string>;
    spinnerNews: boolean = false;
    newsImagesUrl: string = environment.apiImageNews;

    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;

    addCommentForm: FormGroup;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.addCommentForm.patchValue({user_id: (result ? result.id : '')});
        });
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerNews = true;
            this.newsService.getNewsItem(+params['id']).subscribe(
                result => {
                    this.news = result;
                    this.addCommentForm = this.formBuilder.group({
                        user_id: ['', [Validators.required]],
                        news_id: [this.news.id, [Validators.required]],
                        body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
                    });
                    this.spinnerNews = false;
                },
                error => {
                    this.errorNews = error;
                    this.spinnerNews = false;
                }
            );
        });
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }
    
    goBack() {
        this.location.back();
    }
    
    onSubmit(value, valid) {
        this.spinnerButton = true;
        this.commentService.createComment(value).subscribe(
            response => {
                this.spinnerNews = true;
                this.newsService.getNewsItem(value.news_id)
                    .subscribe(
                        result => {
                            this.news = result;
                            this.spinnerNews = false;
                        },
                        error => {
                            this.errorNews = error;
                            this.spinnerNews = false;
                        });
                this.notificationService.success('Успішно', 'Новий коментар додано');
                this.addCommentForm.patchValue({body: ''});
                this.addCommentForm.get('body').markAsUntouched();
                this.addCommentForm.get('body').markAsPristine();
                this.spinnerButton = false;
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
                this.spinnerButton = false;
            }
        );
    }
}