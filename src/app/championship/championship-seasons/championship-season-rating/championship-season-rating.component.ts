import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../../shared/auth.service';
import { ChampionshipRating }           from '../../../shared/models/championship-rating.model';
import { ChampionshipRatingService }    from '../../shared/championship-rating.service';
import { CurrentStateService }          from '../../../shared/current-state.service';
import { User }                         from '../../../shared/models/user.model';

@Component({
  selector: 'app-championship-season-rating',
  templateUrl: './championship-season-rating.component.html',
  styleUrls: ['./championship-season-rating.component.css']
})
export class ChampionshipSeasonRatingComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private championshipRatingService: ChampionshipRatingService,
        private currentStateService: CurrentStateService
    ) { }

    rating: ChampionshipRating[];
    spinnerRating: boolean = false;
    errorRating: string;
    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerRating = true;
            this.reloadComponent();
            let param = [{parameter: 'season_id', value: <string>params['id']}];
            this.championshipRatingService.get(param).subscribe(
                response => {
                    this.rating = response;
                    this.spinnerRating = false;
                }, 
                error => {
                    this.errorRating = error;
                    this.spinnerRating = false;
                }
            );
        });
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    private reloadComponent() {
        this.rating = null;
        this.errorRating = null;
    }
}
