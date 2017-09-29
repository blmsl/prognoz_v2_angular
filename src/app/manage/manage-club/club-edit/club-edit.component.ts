import { Location }                             from '@angular/common';
import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { ActivatedRoute, Router, Params }       from '@angular/router';

import { Club }                                 from '../../../shared/models/club.model';
import { ClubService }                          from '../shared/club.service';
import { environment }                          from '../../../../environments/environment';
import { ImageService }                         from '../../../core/image.service';
import { NotificationsService }                 from 'angular2-notifications';

@Component({
  selector: 'app-club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private clubService: ClubService,
        private formBuilder: FormBuilder,
        private imageService: ImageService,
        private location: Location,
        private notificationService: NotificationsService,
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
    clubs: Club[];
    clubEditForm: FormGroup;
    clubImagesUrl = environment.apiImageClubs;
    errorClub: string | Array<string>;
    errorClubs: string | Array<string>;
    errorImage: string;
    noClubs: string = 'В базі даних команд не знайдено.';
    spinnerButton: boolean = false;
    spinnerClub: boolean = false;
    spinnerClubs: boolean = false;

    fileChange(event) {
        this.imageService.fileChange(event, environment.imageSettings.club);
    }

    ngOnInit() {
        this.clubEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            link: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            image: [''],
            parent_id: ['']
        });

        this.activatedRoute.params.forEach((params: Params) => {
            this.getClubData(params['id']);
        });
        this.getClubsData();
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

    private getClubData(id: number) {
        this.spinnerClub = true;
        this.clubService.getClub(id).subscribe(
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
    }

    private getClubsData() {
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
    }
}
