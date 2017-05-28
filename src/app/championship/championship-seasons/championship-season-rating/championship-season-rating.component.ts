import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-championship-season-rating',
  templateUrl: './championship-season-rating.component.html',
  styleUrls: ['./championship-season-rating.component.css']
})
export class ChampionshipSeasonRatingComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute
    ) { }
  
    seasonId: number;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.seasonId = +params['id'];
        });
    }

}
