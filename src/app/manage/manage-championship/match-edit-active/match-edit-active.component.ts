import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatch }                    from '../shared/championship-match.model';
import { ManageChampionshipMatchService }       from '../shared/manage-championship-match.service';
import { ManageClubService }                    from '../../manage-club/shared/manage-club.service';
import { Club }                                 from '../../manage-club/shared/club.model';
import { API_IMAGE_CLUBS }                      from '../../../shared/app.settings';

@Component({
    selector: 'app-match-edit-active',
    templateUrl: './match-edit-active.component.html',
    styleUrls: ['./match-edit-active.component.css']
})
export class MatchEditActiveComponent implements OnInit {

    constructor(private formBuilder: FormBuilder,
                private notificationService: NotificationsService,
                private manageChampionshipMatchService: ManageChampionshipMatchService,
                private manageClubService: ManageClubService) {
    }

    championshipMatchEditActiveForm: FormGroup;
    activeMatches: Array<ChampionshipMatch> = [];
    clubs: Array<Club> = [];
    errorActiveMatches: string | Array<string>;
    errorClubs: string | Array<string>;
    spinnerActiveMatches: boolean = false;
    spinnerClubs: boolean = false;
    spinnerButton: boolean = false;
    selectedMatch: ChampionshipMatch;
    clubsImagesUrl: string = API_IMAGE_CLUBS;

    ngOnInit() {
        this.championshipMatchEditActiveForm = this.formBuilder.group({
            t1_id: ['', [Validators.required]],
            t2_id: ['', [Validators.required]],
            starts_at: ['', [Validators.required]]
        });
        this.getActive();
        this.getClubs();
    }

    private getActive() {
        this.spinnerActiveMatches = true;
        this.manageChampionshipMatchService.getCurrentCompetitionMatches('active').subscribe(
            response => {
                this.activeMatches = response;
                this.spinnerActiveMatches = false;
            },
            error => {
                this.errorActiveMatches = error;
                this.spinnerActiveMatches = false;
            }
        );
    }

    private getClubs() {
        this.spinnerClubs = true;
        this.manageClubService.getClubs().subscribe(
            response => {
                this.clubs = response;
                this.spinnerClubs = false;
            },
            error => {
                this.errorClubs = error;
                this.spinnerClubs = false;
            }
        );
    }

    onSubmit() {
        if (this.selectedMatch.id) {
            this.spinnerButton = true;
            this.manageChampionshipMatchService.editActive(this.championshipMatchEditActiveForm.value, this.selectedMatch.id).subscribe(
                response => {
                    this.spinnerButton = false;
                    this.selectedMatch = response;

                    this.getActive();
                    this.notificationService.success('Успішно', 'Матч змінено');
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
        }
    }

    onChange(id) {
        this.selectedMatch = this.activeMatches.find(myObj => myObj.id == id);
        this.championshipMatchEditActiveForm.patchValue({
            t1_id: this.selectedMatch.t1_id,
            t2_id: this.selectedMatch.t2_id,
            starts_at: this.selectedMatch.starts_at
        });
    }

}
