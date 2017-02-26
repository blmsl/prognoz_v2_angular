import { Component, OnInit }         from '@angular/core';

import { ChampionshipRatingService } from '../shared/championship-rating.service';
import { HelperService }             from '../../shared/helper.service';
import { UserService }               from '../../shared/user.service';
import { ChampionshipRating }        from '../shared/championship-rating.model';

@Component({
  selector: 'app-championship-rating',
  templateUrl: './championship-rating.component.html',
  styleUrls: ['./championship-rating.component.css']
})
export class ChampionshipRatingComponent implements OnInit {

    constructor(
        private championshipRatingService: ChampionshipRatingService,
        private userService: UserService,
        public helperService: HelperService
    ) { }
    
    rating: ChampionshipRating[];
    spinner: boolean = false;
    error: string;
    authenticatedUser: any;
  
    ngOnInit() {
        this.authenticatedUser = this.userService.sharedUser;
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
}
