import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { TeamTeamMatch }                from '../../shared/models/team-team-match.model';
import { TeamTeamMatchService }         from '../shared/team-team-match.service';
import { User }                         from '../../shared/models/user.model';

@Component({
    selector: 'app-team-my',
    templateUrl: './team-my.component.html',
    styleUrls: ['./team-my.component.css']
})
export class TeamMyComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private teamTeamMatchService: TeamTeamMatchService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    errorTeamTeamMatches: string;
    nextRound: string;
    noAccess: string = 'Доступ заборонено. Залогуйтесь на сайт для перегляду цієї сторінки.';
    path: string = '/team/my/round/';
    previousRound: string;
    spinnerTeamTeamMatches: boolean = false;
    teamTeamMatches: TeamTeamMatch[];
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
            this.getTeamTeamMatchesData(params['round']);
        });
    }
}
