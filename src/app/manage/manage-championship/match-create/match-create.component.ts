import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatch }                    from '../../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../../../championship/shared/championship-match.service';
import { ManageClubService }                    from '../../manage-club/shared/manage-club.service';
import { Club }                                 from '../../../shared/models/club.model';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-match-create',
  templateUrl: './match-create.component.html',
  styleUrls: ['./match-create.component.css']
})
export class MatchCreateComponent implements OnInit {
    
    constructor(
        private router: Router,
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService,
        private championshipMatchService: ChampionshipMatchService,
        private manageClubService: ManageClubService
    ) { }
    
    championshipMatchCreateForm: FormGroup;
    addedMatches: Array<ChampionshipMatch> = [];
    error: string | Array<string>;
    clubsImagesUrl: string = environment.API_IMAGE_CLUBS;
    clubs: Array<Club> = [];
    lastEnteredDate: string;
    spinner: boolean = false;

    ngOnInit() {
        this.championshipMatchCreateForm = this.formBuilder.group({
            t1_id: ['', [Validators.required]],
            t2_id: ['', [Validators.required]],
            starts_at: ['', [Validators.required]]
        });

        this.manageClubService.getClubs().subscribe(
            response => {
                this.clubs = response;
            },
            error => {
                this.error = error;
            }
        );
    }

    onSubmit() {
        this.spinner = true;
        this.championshipMatchService.create(this.championshipMatchCreateForm.value).subscribe(
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
