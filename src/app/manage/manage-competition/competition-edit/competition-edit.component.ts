import { Location }                                         from '@angular/common';
import { Component, OnInit }                                from '@angular/core';
import { ActivatedRoute, Params, Router }                   from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators }  from '@angular/forms';

import { Competition }                                      from '../../../shared/models/competition.model';
import { CompetitionService }                               from '../shared/competition.service';
import { environment }                                      from '../../../../environments/environment';
import { NotificationsService }                             from 'angular2-notifications';
import { Season }                                           from '../../../shared/models/season.model';
import { SeasonService }                                    from '../../manage-season/shared/season.service';
import { Tournament }                                       from '../../../shared/models/tournament.model';
import { TournamentService }                                from '../../manage-tournament/shared/tournament.service';


@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private competitionService: CompetitionService,
        private formBuilder: FormBuilder,
        private location: Location,
        private notificationService: NotificationsService,
        private seasonService: SeasonService,
        private tournamentService: TournamentService
    ) { }

    competition: Competition;
    competitionEditForm: FormGroup;
    competitionsEnvironment = environment.tournaments;
    errorCompetition: string;
    errorSeasons: string;
    errorTournaments: string;
    noSeasons: string = 'В базі даних сезонів не знайдено.';
    noTournaments: string;
    seasons: Season[];
    spinnerButton: boolean = false;
    spinnerCompetition: boolean = false;
    spinnerSeasons: boolean = false;
    spinnerTournaments: boolean = false;
    tournaments: Tournament[];

    ngOnInit() {
        this.competitionEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            season_id: ['', [Validators.required]],
            tournament_id: ['', [Validators.required]],
            number_of_teams: ['', [this.validateNumberOfTeams]],
            stated: ['', [Validators.required]],
            active: ['', [Validators.required]],
            ended: ['', [Validators.required]]
        });

        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerCompetition = true;
            this.competitionService.getCompetition(params['id']).subscribe(
                response => {
                    this.competition = response;
                    this.competitionEditForm.patchValue({
                        id: response.id,
                        title: response.title,
                        season_id: response.season_id,
                        tournament_id: response.tournament_id,
                        number_of_teams: response.number_of_teams,
                        stated: response.stated,
                        active: response.active,
                        ended: response.ended
                    });
                    this.spinnerCompetition = false;
                },
                error => {
                    this.errorCompetition = error;
                    this.spinnerCompetition = false;
                }
            );
        });

        this.spinnerSeasons = true;
        this.seasonService.getSeasons().subscribe(
            response => {
                if (response) {
                    this.seasons = response.seasons;
                }
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
                if (!response) {
                    this.noTournaments = 'В базі даних турнірів не знайдено.'
                } else {
                    this.tournaments = response.tournaments;
                }
                this.spinnerTournaments = false;
            },
            error => {
                this.errorTournaments = error;
                this.spinnerTournaments = false;
            }
        );
    }

    onSubmit() {
        this.spinnerButton = true;
        this.competitionService.updateCompetition(this.competitionEditForm.value)
            .subscribe(
                response => {
                    this.notificationService.success('Успішно', 'Змагання змінено');
                    this.spinnerButton = false;
                    this.location.back();
                },
                errors => {
                    errors.forEach(error => this.notificationService.error('Помилка', error));
                    this.spinnerButton = false;
                }
            );
    }

    validateNumberOfTeams(numberOfTeams: FormControl) {
        return (numberOfTeams.value % 2 === 0) ? null : {
            parity: {
                valid: false
            }
        };
    }
}
