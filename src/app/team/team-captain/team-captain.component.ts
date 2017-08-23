import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm }                       from '@angular/forms';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { environment }                  from '../../../environments/environment';
import { NotificationsService }         from 'angular2-notifications';
import { TeamMatch }                    from '../../shared/models/team-match.model';
import { TeamMatchService }             from '../../manage/manage-team/shared/team-match.service';
import { TeamParticipant }              from '../../shared/models/team-participant.model';
import { TeamParticipantService }       from '../shared/team-participant.service';
import { TeamPredictionService }        from '../shared/team-prediction.service';
import { User }                         from '../../shared/models/user.model';

@Component({
    selector: 'app-team-captain',
    templateUrl: './team-captain.component.html',
    styleUrls: ['./team-captain.component.css']
})
export class TeamCaptainComponent implements OnInit, OnDestroy {

    authenticatedUser: User = this.currentStateService.user;
    availableTeamParticipants: any;
    currentTeamId: number;
    errorTeamMatches: string;
    errorTeamParticipants: string;
    isCaptain: boolean = false;
    round: number;
    spinnerButton: any = {};
    spinnerTeamMatches: boolean = false;
    spinnerTeamParticipants: boolean = false;
    teamEnvironment = environment.tournaments.team;
    teamMatches: TeamMatch[];
    teamParticipants: TeamParticipant[];
    userSubscription: Subscription;

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private notificationService: NotificationsService,
        private teamMatchService: TeamMatchService,
        private teamParticipantService: TeamParticipantService,
        private teamPredictionService: TeamPredictionService
    ) {}

    getMyTeamMatchesData(round?: number) {
        this.resetMyTeamMatchesData();
        this.spinnerTeamMatches = true;
        let param = [{parameter: 'filter', value: 'my'}];
        if (round) param.push({parameter: 'round', value: round.toString()});
        this.teamMatchService.getTeamMatchesAuthUser(param).subscribe(
            response => {
                if (response) {
                    this.teamMatches = response.team_matches;
                    this.availableTeamParticipants = this.setAvailableTeamParticipants(response.team_matches);
                }
                this.spinnerTeamMatches = false;
            },
            error => {
                this.errorTeamMatches = error;
                this.spinnerTeamMatches = false;
            }
        );
    }

    getTeamParticipantsData() {
        this.resetMyTeamParticipantsData();
        this.spinnerTeamParticipants = true;
        let param = [{parameter: 'current', value: 'true'}];
        this.teamParticipantService.getCurrentTeamParticipants(param)
            .subscribe(
                response => {
                    if (response) {
                        this.teamParticipants = response.team_participants;
                        this.currentTeamId = response.team_participants[0].team_id;
                        this.getTeamCaptain(response.team_participants);
                    }
                    this.spinnerTeamParticipants = false;
                },
                error => {
                    this.errorTeamParticipants = error;
                    this.spinnerTeamParticipants = false;
                }
            );
    }

    matchHasPrediction(teamMatch: TeamMatch): boolean {
        return teamMatch.team_predictions[0] && teamMatch.team_predictions[0].user_id;
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
                this.getMyTeamMatchesData(this.round || null);
                this.getTeamParticipantsData();
            }
        });
        this.activatedRoute.params.subscribe((params: Params) => {
            this.round = params['round'] || null;
            if (this.authenticatedUser) {
                this.getMyTeamMatchesData(params['round'] || null);
                this.getTeamParticipantsData();
            }
        });
    }

    updateOrCreateTeamPredictor(teamPredictorForm: NgForm, teamMatch: TeamMatch) {
        if (this.authenticatedUser && this.isCaptain) {
            this.spinnerButton['team_match_' + teamMatch.id] = true;
            let teamPrediction = {
                id: this.matchHasPrediction(teamMatch) ? teamMatch.team_predictions[0].id : null,
                team_id: this.currentTeamId,
                team_match_id: teamMatch.id,
                user_id: teamPredictorForm.value.user_id ? teamPredictorForm.value.user_id : null
            };
            this.teamPredictionService.updateTeamPrediction(teamPrediction).subscribe(
                response => {
                    this.notificationService.success('Успішно', 'Прогнозиста вибрано');
                    this.getMyTeamMatchesData(this.round);
                    this.spinnerButton['team_match_' + teamMatch.id] = false;
                },
                errors => {
                    errors.forEach(error => this.notificationService.error('Помилка', error));
                    this.spinnerButton['team_match_' + teamMatch.id] = false;
                }
            );
        }
    }

    private getTeamCaptain(teamParticipants: TeamParticipant[]) {
        if (this.authenticatedUser) {
            teamParticipants.forEach(teamParticipant => {
                if (teamParticipant.captain && teamParticipant.user_id === this.authenticatedUser.id) {
                    this.isCaptain = true;
                }
            });
        }
    }

    private resetMyTeamMatchesData(): void {
        this.teamMatches = null;
        this.errorTeamMatches = null
    }

    private resetMyTeamParticipantsData(): void {
        this.teamParticipants = null;
        this.errorTeamParticipants = null;
    }

    private setAvailableTeamParticipants(teamMatches: TeamMatch[]) {
        let teamParticipants: any = {};
        let initialParticipantNumberOfPredictions = this.teamEnvironment.matchesInRound / this.teamEnvironment.participantsInTeam;
        teamMatches.forEach(teamMatch => {
            if (this.matchHasPrediction(teamMatch)) {
                if (!teamParticipants[teamMatch.team_predictions[0].user_id]) {
                    teamParticipants[teamMatch.team_predictions[0].user_id] = {
                        predictionsLeft: initialParticipantNumberOfPredictions - 1,
                        participantAvailable: true
                    };
                } else {
                    let predictionsLeft = teamParticipants[teamMatch.team_predictions[0].user_id].predictionsLeft;
                    teamParticipants[teamMatch.team_predictions[0].user_id].predictionsLeft = predictionsLeft - 1;
                    if (teamParticipants[teamMatch.team_predictions[0].user_id].predictionsLeft === 0) {
                        teamParticipants[teamMatch.team_predictions[0].user_id].participantAvailable = false;
                    }
                }
            }
        });

        return teamParticipants;
    }
}
