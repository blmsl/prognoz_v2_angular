import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';

import { ChampionshipMatch }                    from '../../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../../../championship/shared/championship-match.service';
import { Club }                                 from '../../../shared/models/club.model';
import { ClubService }                          from '../../manage-club/shared/club.service';
import { environment }                          from '../../../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {
    
    constructor(
        private championshipMatchService: ChampionshipMatchService,
        private clubService: ClubService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService
    ) { }

    clubs: Club[];
    spinnerClubs: boolean = false;
    errorClubs: string | Array<string>;
    noClubs: string = 'В базі даних команд не знайдено.';

    championshipMatchCreateForm: FormGroup;
    addedMatches: Array<ChampionshipMatch> = [];
    error: string | Array<string>;
    lastEnteredDate: string;
    spinner: boolean = false;

    clubsImagesUrl: string = environment.apiImageClubs;

    ngOnInit() {
        this.championshipMatchCreateForm = this.formBuilder.group({
            t1_id: ['', [Validators.required]],
            t2_id: ['', [Validators.required]],
            starts_at: ['', [Validators.required]]
        });

        this.spinnerClubs = true;
        this.clubService.getClubs().subscribe(
            response => {
                this.clubs = response.clubs;
                this.spinnerClubs = false;
            },
            error => {
                this.errorClubs = error;
                this.spinnerClubs = false;
            }
        );
    }

    onSubmit() {
        this.spinner = true;
        this.championshipMatchService.createChampionshipMatch(this.championshipMatchCreateForm.value).subscribe(
            response => {
                this.lastEnteredDate = response.starts_at;
                this.resetForm();
                this.championshipMatchCreateForm.patchValue({starts_at: this.lastEnteredDate});
                this.addedMatches.push(response);
                this.notificationService.success('Успішно', 'Матч додано!');
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

    swapClubs() {
        let t1_id = this.championshipMatchCreateForm.value.t1_id;
        let t2_id = this.championshipMatchCreateForm.value.t2_id;
        this.championshipMatchCreateForm.patchValue({t1_id: t2_id, t2_id: t1_id});
    }

    resetForm() {
        this.championshipMatchCreateForm.reset();
    }
}
