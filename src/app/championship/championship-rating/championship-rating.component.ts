import { Component, OnInit }         from '@angular/core';

import { ChampionshipRatingService } from '../shared/championship-rating.service';
import { ChampionshipRating }        from '../shared/championship-rating.model';

@Component({
  selector: 'app-championship-rating',
  templateUrl: './championship-rating.component.html',
  styleUrls: ['./championship-rating.component.css']
})
export class ChampionshipRatingComponent implements OnInit {

    constructor(
        private championshipRatingService: ChampionshipRatingService
    ) { }
    
    rating: ChampionshipRating[];
    spinner: boolean = false;
    error: string;
  
    ngOnInit() {
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
    
    getHometown(hometown: string | null) {
        return hometown ? '(' + hometown + ')' : '';
    }

    makeUnsigned(moving: number) {}
}
