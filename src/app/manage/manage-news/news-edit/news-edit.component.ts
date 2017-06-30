import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { News }                                 from '../../../shared/models/news.model';
import { NewsService }                          from '../../../news/shared/news.service';
import { ImageService }                         from '../../../shared/image.service';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService,
        private newsService: NewsService,
        private imageService: ImageService
    ) {
        imageService.uploadedImage$.subscribe(
            result => {
                this.newsEditForm.patchValue({image: result});
                this.errorImage = null;
            }
        );
        imageService.uploadError$.subscribe(
            result => { this.errorImage = result }
        );
    }

    news: News;
    errorNews: string | Array<string>;
    newsImagesUrl = environment.API_IMAGE_NEWS;
    spinnerNews: boolean = false;

    newsEditForm: FormGroup;
    errorImage: string;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.newsEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
            body: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]],
            tournament_id: ['', [Validators.required]],
            image: ['']
        });

        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerNews = true;
            this.newsService.getNewsItem(+params['id']).subscribe(
                result => {
                    this.newsEditForm.patchValue({
                        id: result.id,
                        title: result.title,
                        body: result.body,
                        tournament_id: result.tournament_id
                    });
                    this.news = result;
                    this.spinnerNews = false;
                },
                error => {
                    this.errorNews = error;
                    this.spinnerNews = false;
                });
        });
    }

    fileChange(event) {
        this.imageService.fileChange(event, environment.IMAGE_SETTINGS.NEWS);
    }

    onSubmit() {
        this.spinnerButton = true;
        this.newsService.updateNewsItem(this.newsEditForm.value).subscribe(
            response => {
                this.router.navigate(['/news/' + this.news.id]);
                this.notificationService.success('Успішно', 'Новину змінено!');
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
