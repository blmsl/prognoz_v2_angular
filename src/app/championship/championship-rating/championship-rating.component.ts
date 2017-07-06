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
    
    rating: ChampionshipRating[];
    spinner: boolean = false;
    error: string;
    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;
  
    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });
        this.spinner = true;
        this.championshipRatingService.get().subscribe(
            response => {
                this.rating = response;
                this.spinner = false;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }
}
