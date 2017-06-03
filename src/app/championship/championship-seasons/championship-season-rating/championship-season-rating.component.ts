import { Component, OnInit }            from '@angular/core';
import { ActivatedRoute, Params }       from '@angular/router';

import { ChampionshipRatingService }    from '../../../championship/shared/championship-rating.service';
import { UserService }                  from '../../../shared/user.service';
import { ChampionshipRating }           from '../../../shared/models/championship-rating.model';

@Component({
  selector: 'app-championship-season-rating',
  templateUrl: './championship-season-rating.component.html',
  styleUrls: ['./championship-season-rating.component.css']
})
export class ChampionshipSeasonRatingComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private championshipRatingService: ChampionshipRatingService,
        private userService: UserService
    ) { }

    rating: ChampionshipRating[];
    spinnerRating: boolean = false;
    errorRating: string;
    authenticatedUser: any;

    ngOnInit() {
        this.authenticatedUser = this.userService.sharedUser;
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

    private reloadComponent() {
        this.rating = null;
        this.errorRating = null;
    }
}
