import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { TeamMatch }                    from '../../shared/models/team-match.model';
import { TeamMatchService }             from '../../manage/manage-team/shared/team-match.service';
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
        private teamMatchService: TeamMatchService,
        private teamTeamMatchService: TeamTeamMatchService,
        private teamPredictionService: TeamPredictionService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    blockedTeamMatchFirst: TeamMatch = null;
    blockedTeamMatchSecond: TeamMatch = null;
    errorTeamMatches: string;
    errorTeamTeamMatches: string;
    errorTeamPredictions: string;
    isGoalkeeper: boolean = false;
    nextRound: string;
    noAccess: string = 'Доступ заборонено. Увійдіть на сайт для перегляду цієї сторінки.';
    noTeamPredictions: string = 'Командний чемпіонат ще не почався / матчів для прогнозування не знайдено';
    oppositeTeamId: number;
    path: string = '/team/predictions/round/';
    previousRound: string;
    round: number;
    spinnerTeamMatches: boolean = false;
    spinnerTeamTeamMatches: boolean = false;
    spinnerTeamPredictions: boolean = false;
    teamMatches: TeamMatch[];
    teamTeamMatches: TeamTeamMatch[];
    teamPredictions: TeamPrediction[];
    userSubscription: Subscription;

    getMyTeamMatchesData(round?: number) {
        this.resetTeamMatchesData();
        this.spinnerTeamMatches = true;
        let param = [{parameter: 'filter', value: 'opponents'}];
        if (round) param.push({parameter: 'round', value: round.toString()});
        this.teamMatchService.getTeamMatchesAuthUser(param).subscribe(
            response => {
                if (response) {
                    this.teamMatches = response.team_matches;
                    this.setBlockedMatches(response.team_matches);
                }
                this.spinnerTeamMatches = false;
            },
            error => {
                this.errorTeamMatches = error;
                this.spinnerTeamMatches = false;
            }
        );
    }

    getTeamGoalkeeperData() {
        if (this.teamTeamMatches && this.authenticatedUser) {
            for (let teamTeamMatch of this.teamTeamMatches) {
                if (this.authenticatedUser.id === teamTeamMatch.home_team_goalkeeper_id) {
                    this.oppositeTeamId = teamTeamMatch.away_team_id;
                    this.getMyTeamMatchesData(this.round);
                    this.isGoalkeeper = true;
                } else if (this.authenticatedUser.id === teamTeamMatch.away_team_goalkeeper_id) {
                    this.oppositeTeamId = teamTeamMatch.home_team_id;
                    this.getMyTeamMatchesData(this.round);
                    this.isGoalkeeper = true;
                }
            }
        }
    }

    getTeamTeamMatchesData(round?: number) {
        this.spinnerTeamTeamMatches = true;
        this.teamTeamMatchService.getTeamTeamMatches(round).subscribe(
            response => {
                if (response) {
                    this.teamTeamMatches = response.data;
                    this.nextRound = response.next_page_url;
                    this.previousRound = response.prev_page_url;
                    this.getTeamGoalkeeperData();
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
                    if (response) this.teamPredictions = response.team_predictions;
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
            this.resetTeamGoalkeeperData();
            if (result) {
                this.getTeamTeamMatchesData(this.round);
                this.getTeamPredictionsData(this.round || null);
            }
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.round = params['round'] || null;
            this.resetTeamGoalkeeperData();
            if (this.authenticatedUser) {
                this.getTeamTeamMatchesData(params['round']);
                this.getTeamPredictionsData(params['round'] || null);
            }
        });
    }

    reloadTeamGoalkeeperData():void {
        this.resetTeamGoalkeeperData();
        this.getTeamTeamMatchesData(this.round);
    }

    reloadTeamPredictionsData() {
        this.getTeamPredictionsData(this.round);
    }

    setBlockedMatches(teamMatches: TeamMatch[]) {
        for (let teamMatch of teamMatches) {
            if (teamMatch.team_predictions && teamMatch.team_predictions[0] && teamMatch.team_predictions[0].blocked_by) {
                if (!this.blockedTeamMatchFirst) {
                    this.blockedTeamMatchFirst = teamMatch;
                } else {
                    this.blockedTeamMatchSecond = teamMatch;
                }
            }
        }
    }

    private resetTeamPredictionsData(): void {
        this.teamPredictions = null;
        this.errorTeamPredictions = null;
    }

    private resetTeamMatchesData(): void {
        this.teamMatches = null;
        this.errorTeamMatches = null;
    }

    private resetTeamGoalkeeperData(): void {
        this.blockedTeamMatchFirst = null;
        this.blockedTeamMatchSecond = null;
        this.isGoalkeeper = false;
        this.oppositeTeamId = null;
    }
}
