import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Location }                             from '@angular/common';

import { CompetitionService }                   from '../shared/competition.service';
import { SeasonService }                        from '../../manage-season/shared/season.service';
import { TournamentService }                    from '../../manage-tournament/shared/manage-tournament.service';
import { Season }                               from '../../../shared/models/season.model';
import { Tournament }                           from '../../../shared/models/tournament.model';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.css']
})
export class CompetitionCreateComponent implements OnInit {

    constructor(
        private notificationService: NotificationsService,
        private seasonService: SeasonService,
        private competitionService: CompetitionService,
        private location: Location,
        private tournamentService: TournamentService
    ) { }

    spinner: boolean = false;
    spinnerButton: boolean = false;
    error: string | boolean;
    seasons: Season[];
    tournaments: Tournament[];
    competitionCreateForm: FormGroup;
  
    ngOnInit() {
        this.spinner = true;
        this.seasonService.getSeasons().subscribe(
            response => {
                this.seasons = response;
                this.spinner = false;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );

        this.spinner = true;
        this.tournamentService.getTournaments().subscribe(
            response => {
                this.tournaments = response;
                this.spinner = false;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
        
        this.competitionCreateForm = new FormGroup({
            title: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]),
            season_id: new FormControl('', [Validators.required]),
            tournament_id: new FormControl('', [Validators.required])
        });
    }
    
    onSubmit() {
        this.spinnerButton = true;
        this.competitionService.create(this.competitionCreateForm.value).subscribe(
            response => {
                this.notificationService.success('Успішно', 'Змагання створено');
                this.spinnerButton = false;
                this.location.back();
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
