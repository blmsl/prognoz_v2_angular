import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../shared/auth.service';
import { ChampionshipRating }           from '../../shared/models/championship-rating.model';
import { ChampionshipRatingService }    from '../shared/championship-rating.service';
import { CurrentStateService }          from '../../shared/current-state.service';
import { HelperService }                from '../../shared/helper.service';
import { User }                         from '../../shared/models/user.model';

@Component({
  selector: 'app-championship-rating',
  templateUrl: './championship-rating.component.html',
  styleUrls: ['./championship-rating.component.css']
})
export class ChampionshipRatingComponent implements OnInit, OnDestroy {

    constructor(
        private authService: AuthService,
        private championshipRatingService: ChampionshipRatingService,
        private currentStateService: CurrentStateService,
        public helperService: HelperService
    ) { }
    
    championshipRatingItems: ChampionshipRating[];
    spinnerRating: boolean = false;
    errorRating: string;

    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;
  
    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });
        this.spinnerRating = true;
        this.championshipRatingService.getChampionshipRatingItems().subscribe(
            response => {
                if (response) {
                    this.championshipRatingItems = response.championship_ratings;
                }
                this.spinnerRating = false;
            },
            error => {
                this.errorRating = error;
                this.spinnerRating = false;
            }
        );
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }
}
