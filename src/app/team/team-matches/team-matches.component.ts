import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { Competition }                  from '../../shared/models/competition.model';
import { CompetitionService }           from '../../manage/manage-competition/shared/competition.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { environment }                  from '../../../environments/environment';
import { TeamTeamMatch }                from '../../shared/models/team-team-match.model';
import { TeamTeamMatchService }         from '../shared/team-team-match.service';
import { User }                         from '../../shared/models/user.model';

@Component({
    selector: 'app-team-matches',
    templateUrl: './team-matches.component.html',
    styleUrls: ['./team-matches.component.css']
})
export class TeamMatchesComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private competitionService: CompetitionService,
        private currentStateService: CurrentStateService,
        private teamTeamMatchService: TeamTeamMatchService,
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    competition: Competition;
    errorCompetition: string;
    errorTeamTeamMatches: string;
    noTeamTeamMatches: string = 'Матчів не знайдено';
    nextRound: string;
    previousRound: string;
    path: string = '/team/matches/round/';
    round: number;
    spinnerCompetition: boolean;
    spinnerTeamTeamMatches: boolean = false;
    teamTeamMatches: TeamTeamMatch[];
    userSubscription: Subscription;

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.round = params['round'] || null;
            if (!params['round']) {
                this.getCompetitionData();
            } else {
                this.getTeamTeamMatchesData(params['round']);
            }
        });
    }

    getCompetitionData() {
        this.spinnerCompetition = true;
        this.competitionService.getCompetitions(null, environment.tournaments.team.id, null, true)
            .subscribe(
                response => {
                    if (response) {
                        this.competition = response.competition;
                        this.getTeamTeamMatchesData(response.competition.round);
                    }
                    this.spinnerCompetition = false;
                },
                error => {
                    this.errorCompetition = error;
                    this.spinnerCompetition = false;
                }
            );
    }

    getTeamTeamMatchesData(round: number) {
        this.spinnerTeamTeamMatches = true;
        this.resetTeamTeamMatchData();
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

    private resetTeamTeamMatchData(): void {
        this.errorTeamTeamMatches = null;
        this.teamTeamMatches = null;
        this.nextRound = null;
        this.previousRound = null;
    }
}
