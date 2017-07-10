import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';

import { Club }                                 from '../../../shared/models/club.model';
import { ClubService }                          from '../shared/club.service';
import { environment }                          from '../../../../environments/environment';
import { ImageService }                         from '../../../shared/image.service';
import { NotificationsService }                 from 'angular2-notifications';

@Component({
  selector: 'app-club-create',
  templateUrl: './club-create.component.html',
  styleUrls: ['./club-create.component.css']
})
export class ClubCreateComponent implements OnInit {

    constructor(
        private clubService: ClubService,
        private imageService: ImageService,
        private notificationService: NotificationsService,
        private router: Router
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
    errorClubs: string | Array<string>;
    spinnerClubs: boolean = false;
    noClubs: string = 'В базі даних команд не знайдено.';

    clubCreateForm: FormGroup;
    errorImage: string;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.spinnerClubs = true;
        this.clubService.getClubs(null, 'national_teams')
            .subscribe(
                result => {
                    this.clubs = result.clubs;
                    this.spinnerClubs = false;
                },
                error => {
                    this.errorClubs = error;
                    this.spinnerClubs = false;
                }
        );

        this.clubCreateForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            link: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]),
            image: new FormControl('', [Validators.required]),
            parent_id: new FormControl(null)
        });
    }

    onSubmit() {
        this.spinnerButton = true;
        if (this.clubCreateForm.value.parent_id === 'country') this.clubCreateForm.value.parent_id = null;
        this.clubService.createClub(this.clubCreateForm.value).subscribe(
            response => {
                this.router.navigate(['/manage/clubs']);
                this.notificationService.success('Успішно', 'Команду ' + response.title + ' створено!');
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

    fileChange(event) {
        this.imageService.fileChange(event, environment.imageSettings.club);
    }
}
