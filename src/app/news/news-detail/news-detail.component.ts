import { Component, OnInit, OnDestroy }         from '@angular/core';
import { ActivatedRoute, Params }               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';
import { NotificationsService }                 from 'angular2-notifications';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { CommentService }                       from '../shared/comment.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { NewsService }                          from '../shared/news.service';
import { News }                                 from '../../shared/models/news.model';
import { User }                                 from '../../shared/models/user.model';
import { environment }                          from '../../../environments/environment';

@Component({
    selector: 'app-news-datail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private location: Location,
        private notificationService: NotificationsService,
        private authService: AuthService,
        private commentService: CommentService,
        private currentStateService: CurrentStateService,
        private newsService: NewsService,
    ) {}

    news: News;
    error: string | Array<string>;
    newsImagesUrl: string = environment.API_IMAGE_NEWS;
    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    authenticatedUser: User = this.currentStateService.user;
    spinner: boolean = false;
    spinnerButton: boolean = false;
    addCommentForm: FormGroup;
    userSubscription: Subscription;

    ngOnInit() {
        this.spinner = true;
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.newsService.getOneNews(id).subscribe(
                result => {
                    this.news = result;
                    this.addCommentForm = this.formBuilder.group({
                        user_id: [this.authenticatedUser ? this.authenticatedUser.id : '', [Validators.required]],
                        news_id: [this.news.id, [Validators.required]],
                        body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
                    });
                    this.spinner = false;
                },
                error => {
                    this.error = error;
                    this.spinner = false;
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
        this.commentService.create(value).subscribe(
            response => {
                this.news.comments = response.comments;
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