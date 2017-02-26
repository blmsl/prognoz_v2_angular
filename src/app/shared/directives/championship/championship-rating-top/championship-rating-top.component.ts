import { Component, OnInit }         from '@angular/core';

import { ChampionshipRatingService } from '../../../../championship/shared/championship-rating.service';
import { HelperService }             from '../../../../shared/helper.service';

import { ChampionshipRating }        from '../../../../championship/shared/championship-rating.model';
import { API_IMAGE_USERS }           from '../../../app.settings';
import { IMAGE_USER_DEFAULT }        from '../../../app.settings';

@Component({
  selector: 'app-championship-rating-top',
  templateUrl: './championship-rating-top.component.html',
  styleUrls: ['./championship-rating-top.component.css']
})
export class ChampionshipRatingTopComponent implements OnInit {

    constructor(
        private championshipRatingService: ChampionshipRatingService,
        public helperService: HelperService
    ) { }

    userImagesUrl: string = API_IMAGE_USERS;
    userImageDefault: string = IMAGE_USER_DEFAULT;
    rating: ChampionshipRating[];
    spinner: boolean = false;
    error: string;
  
    ngOnInit() {
        this.topRating();
    }
  
    topRating() {
        this.rating = [];
        this.spinner = true;
        this.championshipRatingService.get('top').subscribe(
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
