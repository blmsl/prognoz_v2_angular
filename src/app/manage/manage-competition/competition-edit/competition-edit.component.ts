import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Location }                             from '@angular/common';

import { Competition }                          from '../../../shared/models/competition.model';
import { CompetitionService }                   from '../shared/competition.service';
import { SeasonService }                        from '../../manage-season/shared/season.service';
import { TournamentService }                    from '../../manage-tournament/shared/tournament.service';
import { Season }                               from '../../../shared/models/season.model';
import { Tournament }                           from '../../../shared/models/tournament.model';


@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private location: Location,
        private notificationService: NotificationsService,
        private competitionService: CompetitionService,
        private seasonService: SeasonService,
        private tournamentService: TournamentService
    ) { }

    tournaments: Tournament[];
    spinnerTournaments: boolean = false;
    errorTournaments: string;
    noTournaments: string;

    seasons: Season[];
    spinnerSeasons: boolean = false;
    errorSeasons: string;
    noSeasons: string = 'В базі даних сезонів не знайдено.';

    competition: Competition;
    spinnerCompetition: boolean = false;
    errorCompetition: string;

    competitionEditForm: FormGroup;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.competitionEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            season_id: ['', [Validators.required]],
            tournament_id: ['', [Validators.required]],
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
}
