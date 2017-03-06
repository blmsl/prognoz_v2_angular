import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ManageNewsService }                    from '../shared/manage-news.service';
import { ImageService }                         from '../../../shared/image.service';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

    constructor(
        private router: Router,
        private notificationService: NotificationsService,
        private manageNewsService: ManageNewsService,
        private imageService: ImageService
    ) {
        imageService.uploadedImage$.subscribe(
            result => {
                this.newsCreateForm.patchValue({image: result});
                this.errorImage = null;
            }
        );
        imageService.uploadError$.subscribe(
            result => { this.errorImage = result }
        );
    }

    newsCreateForm: FormGroup;
    errorImage: string;
    spinner: boolean = false;

    ngOnInit() {
        this.newsCreateForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
            body: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]),
            image: new FormControl(),
            tournament_id: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        this.spinner = true;
        this.manageNewsService.create(this.newsCreateForm.value).subscribe(
            response => {
                this.router.navigate(['/news/' + response.id]);
                this.notificationService.success('Успішно', 'Новину створено!');
                this.spinner = false;
            },
            errors => {
                for (let error of errors) {
                   this.notificationService.error('Помилка', error);
                }
                this.spinner = false;
            }
        );
    }

    fileChange(event) {
        this.imageService.fileChange(event, environment.IMAGE_SETTINGS.NEWS);
    }
}
