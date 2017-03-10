import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { Club }                                 from '../../../shared/models/club.model';
import { ManageClubService }                    from '../shared/manage-club.service';
import { ImageService }                         from '../../../shared/image.service';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css']
})
export class ClubCreateComponent implements OnInit {

    constructor(
        private router: Router,
        private notificationService: NotificationsService,
        private manageClubService: ManageClubService,
        private imageService: ImageService
    ) {
        imageService.uploadedImage$.subscribe(
            result => {
                this.clubCreateForm.patchValue({image: result});
                this.errorImage = null;
            }
        );
        imageService.uploadError$.subscribe(
            result => { this.errorImage = result }
        );
    }

    clubs: Club[];
    clubCreateForm: FormGroup;
    error: string | Array<string>;
    errorImage: string;
    spinner: boolean = false;

    ngOnInit() {
        this.manageClubService.getAllNationalTeams().subscribe(
            result => this.clubs = result,
            error => this.error = error
        );

        this.clubCreateForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            link: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            image: new FormControl('', [Validators.required]),
            parent_id: new FormControl(null)
        });
    }

    onSubmit() {
        this.spinner = true;
        if (this.clubCreateForm.value.parent_id === 'country') this.clubCreateForm.value.parent_id = null;
        this.manageClubService.create(this.clubCreateForm.value).subscribe(
            response => {
                this.router.navigate(['/manage/clubs']);
                this.notificationService.success('Успішно', 'Команду ' + response.title + ' створено!');
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
        this.imageService.fileChange(event, environment.IMAGE_SETTINGS.CLUB);
    }
}
