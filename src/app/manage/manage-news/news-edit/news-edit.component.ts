import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { News }                                 from '../shared/news.model';
import { ManageNewsService }                    from '../shared/manage-news.service';
import { API_IMAGE_NEWS }                       from '../../../shared/app.settings';

@Component({
  selector: 'app-news-edit',
  templateUrl: './news-edit.component.html',
  styleUrls: ['./news-edit.component.css']
})
export class NewsEditComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private manageNewsService: ManageNewsService,
        private formBuilder: FormBuilder,
        private router: Router,
        private notificationService: NotificationsService
    ) {}

    news: News;
    error: string | Array<string>;
    newsEditForm: FormGroup;
    newsImage: any;
    newsImagesUrl = API_IMAGE_NEWS;
  
    ngOnInit() {
        this.newsEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]],
            body: ['', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]],
            tournament_id: ['', [Validators.required]],
            image: ['']
        });

        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.manageNewsService.getOneNews(id).subscribe(
                result => {
                    this.newsEditForm.patchValue({
                        id: result.id,
                        title: result.title,
                        body: result.body,
                        tournament_id: result.tournament_id
                    });
                    this.news = result
                },
                error => this.error = error
            );
        });
    }

    fileChange(event) {
        let fileList: FileList = event.target.files;
        if(fileList.length > 0) {
            let file: File = fileList[0];
            let myReader: FileReader = new FileReader();
            myReader.onload = (e) => {
                this.newsImage = myReader.result;
            }
            myReader.readAsDataURL(file);
        }
    }

    onSubmit() {
        if (this.newsImage) {
            this.newsEditForm.value.image = this.newsImage;
        }
        this.manageNewsService.update(this.newsEditForm.value).subscribe(
            response => {
                this.router.navigate(['/news/' + this.news.id]);
                this.notificationService.success('Успішно', 'Новину змінено!');
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
            }
        );
    }
}
