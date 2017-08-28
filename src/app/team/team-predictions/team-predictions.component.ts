import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { TeamTeamMatch }                from '../../shared/models/team-team-match.model';
import { TeamTeamMatchService }         from '../shared/team-team-match.service';
import { TeamPrediction }               from '../../shared/models/team-prediction.model';
import { TeamPredictionService }        from '../shared/team-prediction.service';
import { User }                         from '../../shared/models/user.model';

@Component({
    selector: 'app-team-predictions',
    templateUrl: './team-predictions.component.html',
    styleUrls: ['./team-predictions.component.css']
})
export class TeamPredictionsComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private teamTeamMatchService: TeamTeamMatchService,
        private teamPredictionService: TeamPredictionService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    errorTeamTeamMatches: string;
    errorTeamPredictions: string;
    nextRound: string;
    noAccess: string = 'Доступ заборонено. Залогуйтесь на сайт для перегляду цієї сторінки.';
    noTeamPredictions: string = 'Доступних матчів для прогнозування не знайдено';
    path: string = '/team/predictions/round/';
    previousRound: string;
    round: number;
    spinnerTeamTeamMatches: boolean = false;
    spinnerTeamPredictions: boolean = false;
    teamTeamMatches: TeamTeamMatch[];
    teamPredictions: TeamPrediction[];
    userSubscription: Subscription;

    getTeamTeamMatchesData(round?: number) {
        this.spinnerTeamTeamMatches = true;
        this.teamTeamMatchService.getTeamTeamMatches(round).subscribe(
            response => {
                if (response) {
                    this.teamTeamMatches = response.data;
                    this.nextRound = response.next_page_url;
                    this.previousRound = response.prev_page_url;
                }
                this.spinnerTeamTeamMatches = false;
            },
            error => {
                this.errorTeamTeamMatches = error;
                this.spinnerTeamTeamMatches = false;
            }
        );
    }

    getTeamPredictionsData(round?: number) {
        this.spinnerTeamPredictions = true;
        this.resetTeamPredictionsData();
        this.teamPredictionService.getTeamPredictions(round ? [{parameter: 'round', value: round.toString()}] : null)
            .subscribe(
                response => {
                    if (response) {
                        this.teamPredictions = response.team_predictions;
                    }
                    this.spinnerTeamPredictions = false;
                },
                error => {
                    this.errorTeamPredictions = error;
                    this.spinnerTeamPredictions = false;
                }
            );
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            if (result) {
                this.getTeamTeamMatchesData(this.round);
                this.getTeamPredictionsData(this.round || null);
            }
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.round = params['round'];
            if (this.authenticatedUser) {
                this.getTeamTeamMatchesData(params['round']);
                this.getTeamPredictionsData(params['round'] || null);
            }
        });
    }

    reloadTeamPredictionsData() {
        this.getTeamPredictionsData(this.round);
    }

    private resetTeamPredictionsData(): void {
        this.teamPredictions = null;
        this.errorTeamPredictions = null;
    }
}
