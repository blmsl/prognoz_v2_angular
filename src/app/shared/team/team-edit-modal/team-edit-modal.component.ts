import { Component, EventEmitter, Input, OnInit, Output }   from '@angular/core';
import { FormControl, FormGroup, Validators }               from '@angular/forms';

import { Club }                                             from '../../models/club.model';
import { ClubService }                                      from '../../../manage/manage-club/shared/club.service';
import { environment }                                      from '../../../../environments/environment';
import { ImageService }                                     from '../../../core/image.service';
import { NotificationsService }                             from 'angular2-notifications';
import { Team }                                             from '../../models/team.model';

declare var $: any;

@Component({
    selector: 'app-team-edit-modal',
    templateUrl: './team-edit-modal.component.html',
    styleUrls: ['./team-edit-modal.component.css']
})
export class TeamEditModalComponent implements OnInit {

    @Input() hasUnsavedChanges: boolean = false;
    @Input() team: Team = null;
    @Input() spinnerButton: boolean;
    @Input() teamForm: FormGroup;
    @Output() onSubmitted = new EventEmitter<FormGroup>();

    constructor(
        private clubService: ClubService,
        private imageService: ImageService,
        private notificationService: NotificationsService
    ) {
        imageService.uploadedImage$.subscribe(
            result => {
                this.teamForm.patchValue({image: result});
                this.errorImage = null;
            }
        );
        imageService.uploadError$.subscribe(
            result => {
                this.errorImage = result;
            }
        );
    }

    clubs: Club[];
    errorClubs: string;
    errorImage: string;
    options = {
        position: ['left', 'bottom'],
        timeOut: 5000,
        showProgressBar: false,
        maxLength: 0,
        animate: 'scale'
    };
    noClubs: string = 'В базі даних команд не знайдено.';
    spinnerClubs: boolean = false;
    teamImageDefault: string = environment.imageTeamDefault;
    teamImagesUrl: string = environment.apiImageTeams;

    fileChange(event) {
        this.hasUnsavedChanges = true;
        this.imageService.fileChange(event, environment.imageSettings.team);
    }

    ngOnInit() {
        this.getClubsData();
        $('#teamEditModal').on('hidden.bs.modal', (e) => {
            this.resetTeamForm();
        });
    }

    onSubmit() {
        this.onSubmitted.emit(this.teamForm);
    }

    resetTeamForm() {
        if (!this.team) {
            this.teamForm.reset();
        } else {
            this.teamForm.patchValue({
                name: this.team.name,
                caption: this.team.caption,
                club_id: this.team.club_id,
                image: null
            });
        }
    }

    private getClubsData() {
        this.spinnerClubs = true;
        this.clubService.getClubs(null, 'clubs')
            .subscribe(
                response => {
                    if (response) {
                        this.clubs = response.clubs;
                    }
                    this.spinnerClubs = false;
                },
                error => {
                    this.errorClubs = error;
                    this.spinnerClubs = false;
                }
            );
    }

    private resetData(): void {
        this.clubs = null;
        this.errorClubs = null;
    }
}
