import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { TeamRating }                   from '../../shared/models/team-rating.model';
import { TeamRatingUser }               from '../../shared/models/team-rating-user.model';
import { TeamRatingService }            from '../shared/team-rating.service';
import { TeamRatingUserService }        from '../shared/team-rating-user.service';
import { User }                         from '../../shared/models/user.model';

@Component({
    selector: 'app-team-rating',
    templateUrl: './team-rating.component.html',
    styleUrls: ['./team-rating.component.css']
})
export class TeamRatingComponent implements OnDestroy, OnInit {

    constructor(
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private teamRatingService: TeamRatingService,
        private teamRatingUserService: TeamRatingUserService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    spinnerTeamRating: boolean;
    spinnerTeamRatingUser: boolean;
    errorTeamRating: string;
    errorTeamRatingUser: string;
    teamRating: TeamRating[];
    teamRatingUser: TeamRatingUser[];
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
        this.getTeamRatingData();
        this.getTeamRatingUserData();
    }

    private getTeamRatingData() {
        this.resetTeamRating();
        this.spinnerTeamRating = true;
        this.teamRatingService.getTeamRating().subscribe(
            response => {
                if (response) this.teamRating = response;
                this.spinnerTeamRating = false;
            },
            error => {
                this.errorTeamRating = error;
                this.spinnerTeamRating = false;
            }
        );
    }

    private getTeamRatingUserData() {
        this.resetTeamRatingUser();
        this.spinnerTeamRatingUser = true;
        this.teamRatingUserService.getTeamRatingUser().subscribe(
            response => {
                if (response) this.teamRatingUser = response;
                this.spinnerTeamRatingUser = false;
            },
            error => {
                this.errorTeamRatingUser = error;
                this.spinnerTeamRatingUser = false;
            }
        );
    }

    private resetTeamRating(): void {
        this.teamRating = null;
        this.errorTeamRating = null;
    }

    private resetTeamRatingUser(): void {
        this.teamRatingUser = null;
        this.errorTeamRatingUser = null;
    }
}
