import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Location }                             from '@angular/common';

import { Club }                                 from '../../../shared/models/club.model';
import { ClubService }                          from '../shared/club.service';
import { ImageService }                         from '../../../shared/image.service';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private location: Location,
        private notificationService: NotificationsService,
        private clubService: ClubService,
        private imageService: ImageService
    ) {
        imageService.uploadedImage$.subscribe(
            result => {
                this.clubEditForm.patchValue({image: result});
                this.errorImage = null;
            }
        );
        imageService.uploadError$.subscribe(
            result => { this.errorImage = result }
        );
    }

    club: Club;
    errorClub: string | Array<string>;
    spinnerClub: boolean = false;

    clubs: Club[];
    errorClubs: string | Array<string>;
    spinnerClubs: boolean = false;
    noClubs: string = 'В базі даних команд не знайдено.';

    clubEditForm: FormGroup;
    clubImagesUrl = environment.API_IMAGE_CLUBS;
    errorImage: string;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.clubEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            link: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            image: [''],
            parent_id: ['']
        });

        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerClub = true;
            this.clubService.getClub(params['id']).subscribe(
                response => {
                    this.clubEditForm.patchValue({
                        id: response.id,
                        title: response.title,
                        link: response.link,
                        parent_id: response.parent_id
                    });
                    this.club = response;
                    this.spinnerClub = false;
                },
                error => {
                    this.errorClub = error;
                    this.spinnerClub = false;
                }
            );
        });

        this.spinnerClubs = true;
        this.clubService.getClubs(null, 'national_teams')
            .subscribe(
                result => {
                    this.clubs = result;
                    this.spinnerClubs = false;
                },
                error => {
                    this.errorClubs = error;
                    this.spinnerClubs = false;
                }
        );
    }

    fileChange(event) {
        this.imageService.fileChange(event, environment.IMAGE_SETTINGS.CLUB);
    }

    onSubmit() {
        this.spinnerButton = true;
        if (this.clubEditForm.value.parent_id === 'country') this.clubEditForm.value.parent_id = null;
        this.clubService.updateClub(this.clubEditForm.value).subscribe(
            response => {
                this.location.back();
                this.notificationService.success('Успішно', 'Дані команди змінено!');
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
