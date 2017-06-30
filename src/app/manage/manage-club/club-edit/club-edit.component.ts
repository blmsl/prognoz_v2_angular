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
    clubs: Club[];
    error: string | Array<string>;
    clubEditForm: FormGroup;
    clubImagesUrl = environment.API_IMAGE_CLUBS;
    errorImage: string;
    spinner: boolean = false;

    ngOnInit() {
        this.clubEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            link: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
            image: [''],
            parent_id: ['']
        });
      
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.clubService.getClub(id).subscribe(
                response => {
                    this.clubEditForm.patchValue({
                        id: response.id,
                        title: response.title,
                        link: response.link,
                        parent_id: response.parent_id
                    });
                    this.club = response;
                },
                error => this.error = error
            );
        });

        this.clubService.getAllNationalTeams().subscribe(
            result => this.clubs = result,
            error => this.error = error
        );
    }

    fileChange(event) {
        this.imageService.fileChange(event, environment.IMAGE_SETTINGS.CLUB);
    }

    onSubmit() {
        this.spinner = true;
        if (this.clubEditForm.value.parent_id === 'country') this.clubEditForm.value.parent_id = null;
        this.clubService.update(this.clubEditForm.value).subscribe(
            response => {
                this.location.back();
                this.notificationService.success('Успішно', 'Дані команди змінено!');
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

}
