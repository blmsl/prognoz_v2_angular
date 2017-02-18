import { Component, OnInit }        from '@angular/core';

import { ChampionshipMatchService } from '../../../../championship/shared/championship-match.service';
import { ChampionshipMatch }        from '../../../../championship/shared/championship-match.model';
import { API_IMAGE_CLUBS }          from '../../../app.settings';

@Component({
  selector: 'app-championship-last-results',
  templateUrl: './championship-last-results.component.html',
  styleUrls: ['./championship-last-results.component.css']
})
export class ChampionshipLastResultsComponent implements OnInit {

    constructor(
        private championshipMatchService: ChampionshipMatchService
    ) { }

    clubsImagesUrl: string = API_IMAGE_CLUBS;
    matches: ChampionshipMatch[];
    error: string | Array<string>;
    spinner: boolean = false;

    ngOnInit() {
        this.lastMatches();
    }
  
    lastMatches() {
        this.matches = [];
        this.spinner = true;
        this.championshipMatchService.getCurrentCompetitionMatches('last').subscribe(
            response => {
              this.matches = response;
              this.spinner = false;
            },
            error => {
              this.error = error;
              this.spinner = false;
            }
        );
    }

}
