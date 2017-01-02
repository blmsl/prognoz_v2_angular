import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatch }                    from '../shared/championship-match.model';
import { ManageChampionshipService }            from '../shared/manage-championship.service';
import { ManageClubService }                    from '../../manage-club/shared/manage-club.service';
import { Club }                                 from '../../manage-club/shared/club.model';
import { API_IMAGE_CLUBS }                      from '../../../shared/app.settings';

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
        private manageChampionshipService: ManageChampionshipService,
        private manageClubService: ManageClubService
    ) { }
    
    championshipMatchCreateForm: FormGroup;
    addedMatches: Array<ChampionshipMatch> = [];
    error: string | Array<string>;
    clubsImagesUrl: string = API_IMAGE_CLUBS;
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
        this.manageChampionshipService.create(this.championshipMatchCreateForm.value).subscribe(
            response => {
                this.lastEnteredDate = response.match.starts_at;
                this.championshipMatchCreateForm.reset();
                this.championshipMatchCreateForm.patchValue({starts_at: this.lastEnteredDate});
                this.addedMatches.push(response.match);
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

}
