import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { ChampionshipRating }           from '../../shared/models/championship-rating.model';
import { ChampionshipRatingService }    from '../shared/championship-rating.service';
import { CurrentStateService }          from '../../core/current-state.service';
import { HelperService }                from '../../core/helper.service';
import { TitleService }                 from '../../core/title.service';
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
        public helperService: HelperService,
        private titleService: TitleService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    championshipRatingItems: ChampionshipRating[];
    errorChampionshipRating: string;
    userSubscription: Subscription;

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.titleService.setTitle('Рейтинг гравців - Чемпіонат');
        this.userSubscription = this.authService.getUser.subscribe(response => {
            this.authenticatedUser = response;
        });
        this.championshipRatingService.getChampionshipRatingItems().subscribe(
            response => {
                if (response) {
                    this.championshipRatingItems = response.championship_ratings;
                }
            },
            error => {
                this.errorChampionshipRating = error;
            }
        );
    }
}
