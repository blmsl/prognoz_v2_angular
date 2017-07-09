import { Component, OnInit }         from '@angular/core';

import { ChampionshipRating }        from '../../models/championship-rating.model';
import { ChampionshipRatingService } from '../../../championship/shared/championship-rating.service';
import { environment }               from '../../../../environments/environment';
import { HelperService }             from '../../helper.service';

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

    rating: ChampionshipRating[];
    spinnerRating: boolean = false;
    errorRating: string;

    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
  
    ngOnInit() {
        this.topRating();
    }
  
    topRating() {
        this.resetData();
        this.spinnerRating = true;
        let param = [{parameter: 'limit', value: '5'}];
        this.championshipRatingService.getChampionshipRating(param).subscribe(
            response => {
                if (response) {
                    this.rating = response.championship_ratings;
                }
                this.spinnerRating = false;
            },
            error => {
                this.errorRating = error;
                this.spinnerRating = false;
            }
        );
    }

    private resetData(): void {
        this.rating = null;
        this.errorRating = null
    }
}
