import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../../../core/auth.service';
import { ChampionshipRating }           from '../../../../shared/models/championship-rating.model';
import { ChampionshipRatingService }    from '../../../shared/championship-rating.service';
import { CurrentStateService }          from '../../../../core/current-state.service';
import { User }                         from '../../../../shared/models/user.model';

@Component({
  selector: 'app-championship-competition-rating',
  templateUrl: './championship-competition-rating.component.html',
  styleUrls: ['./championship-competition-rating.component.css']
})
export class ChampionshipCompetitionRatingComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private championshipRatingService: ChampionshipRatingService,
        private currentStateService: CurrentStateService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    championshipRatingItems: ChampionshipRating[];
    errorChampionshipRating: string | Array<string>;
    spinnerChampionshipRating: boolean = false;
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
        this.activatedRoute.params.forEach((params: Params) => {
            this.resetData();
            this.spinnerChampionshipRating = true;
            let param = [{parameter: 'competition_id', value: <string>params['competitionId']}];
            this.championshipRatingService.getChampionshipRatingItems(param).subscribe(
                response => {
                    if (response) {
                        this.championshipRatingItems = response.championship_ratings;
                    }
                    this.spinnerChampionshipRating = false;
                },
                error => {
                    this.errorChampionshipRating = error;
                    this.spinnerChampionshipRating = false;
                }
            );
        });
    }

    private resetData() {
        this.championshipRatingItems = null;
        this.errorChampionshipRating = null;
    }
}