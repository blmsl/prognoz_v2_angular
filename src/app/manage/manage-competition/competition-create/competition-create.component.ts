import { Location }                             from '@angular/common';
import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';

import { CompetitionService }                   from '../shared/competition.service';
import { NotificationsService }                 from 'angular2-notifications';
import { Season }                               from '../../../shared/models/season.model';
import { SeasonService }                        from '../../manage-season/shared/season.service';
import { Tournament }                           from '../../../shared/models/tournament.model';
import { TournamentService }                    from '../../manage-tournament/shared/tournament.service';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.css']
})
export class CompetitionCreateComponent implements OnInit {

    constructor(
        private competitionService: CompetitionService,
        private location: Location,
        private notificationService: NotificationsService,
        private seasonService: SeasonService,
        private tournamentService: TournamentService
    ) { }

    tournaments: Tournament[];
    spinnerTournaments: boolean = false;
    errorTournaments: string;
    noTournaments: string = 'В базі даних турнірів не знайдено.';

    seasons: Season[];
    spinnerSeasons: boolean = false;
    errorSeasons: string;
    noSeasons: string = 'В базі даних сезонів не знайдено.';

    competitionCreateForm: FormGroup;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.spinnerSeasons = true;
        this.seasonService.getSeasons().subscribe(
            response => {
                this.seasons = response;
                this.spinnerSeasons = false;
            },
            error => {
                this.errorSeasons = error;
                this.spinnerSeasons = false;
            }
        );

        this.spinnerTournaments = true;
        this.tournamentService.getTournaments().subscribe(
            response => {
                this.tournaments = response;
                this.spinnerTournaments = false;
            },
            error => {
                this.errorTournaments = error;
                this.spinnerTournaments = false;
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
        this.competitionService.createCompetition(this.competitionCreateForm.value).subscribe(
            response => {
                this.notificationService.success('Успішно', 'Змагання створено');
                this.spinnerButton = false;
                this.location.back();
            },
            errors => {
                errors.forEach(error => this.notificationService.error('Помилка', error));
                this.spinnerButton = false;
            }
        );
    }
}
