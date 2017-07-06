import { Component, OnInit }         from '@angular/core';

import { ChampionshipRating }        from '../../../models/championship-rating.model';
import { ChampionshipRatingService } from '../../../../championship/shared/championship-rating.service';
import { environment }               from '../../../../../environments/environment';
import { HelperService }             from '../../../helper.service';

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

    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
    rating: ChampionshipRating[];
    spinner: boolean = false;
    error: string;
  
    ngOnInit() {
        this.topRating();
    }
  
    topRating() {
        this.rating = [];
        this.spinner = true;
        let param = [{parameter: 'limit', value: '5'}];
        this.championshipRatingService.get(param).subscribe(
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
