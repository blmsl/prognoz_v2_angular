import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ManageNewsService }                    from '../shared/manage-news.service';

@Component({
  selector: 'app-news-create',
  templateUrl: './news-create.component.html',
  styleUrls: ['./news-create.component.css']
})
export class NewsCreateComponent implements OnInit {

    constructor(
        private manageNewsService: ManageNewsService,
        private router: Router,
        private notificationService: NotificationsService
    ) { }

    newsCreateForm: FormGroup;
    newsImage: any;

    ngOnInit() {
        this.newsCreateForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
            body: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(3000)]),
            image: new FormControl(),
            tournament_id: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        this.newsCreateForm.value.image = this.newsImage;
        this.manageNewsService.create(this.newsCreateForm.value).subscribe(
            response => {
                this.router.navigate(['/news/' + response.id]);
                this.notificationService.success('Успішно', 'Новину створено!');
            },
            errors => {
                for (let error of errors) {
                   this.notificationService.error('Помилка', error);
                }
            }
        );
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
}
