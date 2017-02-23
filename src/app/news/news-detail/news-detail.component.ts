import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { Location }                             from '@angular/common';
import { NotificationsService }                 from 'angular2-notifications';

import { News }                                 from '../shared/news.model';
import { NewsService }                          from '../shared/news.service';
import { UserService }                          from '../../shared/user.service';
import { CommentService }                       from '../shared/comment.service';
import { API_IMAGE_NEWS }                       from '../../shared/app.settings';
import { API_IMAGE_USERS, IMAGE_USER_DEFAULT }  from '../../shared/app.settings';

@Component({
    selector: 'app-news-datail',
    templateUrl: './news-detail.component.html',
    styleUrls: ['./news-detail.component.css']
})

export class NewsDetailComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private formBuilder: FormBuilder,
        private newsService: NewsService,
        private location: Location,
        private userService: UserService,
        private commentService: CommentService,
        private notificationService: NotificationsService
    ) {}

    news: News;
    error: string | Array<string>;
    newsImagesUrl: string = API_IMAGE_NEWS;
    userImagesUrl: string = API_IMAGE_USERS;
    userImageDefault: string = IMAGE_USER_DEFAULT;
    authenticatedUser: any;
    spinner: boolean = false;
    spinnerButton: boolean = false;
    addCommentForm: FormGroup;

    ngOnInit() {
        this.spinner = true;
        this.authenticatedUser = this.userService.sharedUser;
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