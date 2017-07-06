import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { ChampionshipMatch }                    from '../../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../../../championship/shared/championship-match.service';
import { Club }                                 from '../../../shared/models/club.model';
import { ClubService }                          from '../../manage-club/shared/club.service';
import { environment }                          from '../../../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';

@Component({
    selector: 'app-match-edit-active',
    templateUrl: './match-edit-active.component.html',
    styleUrls: ['./match-edit-active.component.css']
})
export class MatchEditActiveComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService,
        private championshipMatchService: ChampionshipMatchService,
        private clubService: ClubService
    ) { }

    championshipMatchEditActiveForm: FormGroup;
    spinnerButton: boolean = false;

    activeMatches: Array<ChampionshipMatch> = [];
    errorActiveMatches: string | Array<string>;
    spinnerActiveMatches: boolean = false;

    clubs: Club[];
    errorClubs: string | Array<string>;
    noClubs: string = 'В базі даних команд не знайдено.';
    spinnerClubs: boolean = false;

    selectedMatch: ChampionshipMatch;
    clubsImagesUrl: string = environment.apiImageClubs;

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
        this.championshipMatchService.getCurrentCompetitionMatches('active').subscribe(
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
        this.clubService.getClubs().subscribe(
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
            this.championshipMatchService.update(this.championshipMatchEditActiveForm.value, this.selectedMatch.id).subscribe(
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

    swapClubs() {
        let t1_id = this.championshipMatchEditActiveForm.value.t1_id;
        let t2_id = this.championshipMatchEditActiveForm.value.t2_id;
        this.championshipMatchEditActiveForm.patchValue({t1_id: t2_id, t2_id: t1_id});
    }

    resetForm() {
        this.championshipMatchEditActiveForm.reset();
    }

}
