import { Component, OnInit }        from '@angular/core';

import { ChampionshipMatch }        from '../../shared/models/championship-match.model';
import { ChampionshipMatchService } from '../shared/championship-match.service';
import { environment }              from '../../../environments/environment';

@Component({
  selector: 'app-championship-results',
  templateUrl: './championship-results.component.html',
  styleUrls: ['./championship-results.component.css']
})
export class ChampionshipResultsComponent implements OnInit {

    constructor(
        private championshipMatchService: ChampionshipMatchService
    ) { }

    spinner: boolean = false;
    matches: ChampionshipMatch[];
    error: string;
    clubsImagesUrl: string = environment.apiImageClubs;
  
    ngOnInit() {
        this.spinner = true;
        this.championshipMatchService.getCurrentCompetitionMatches('ended').subscribe(
            response => {
                this.spinner = false;
                this.matches = response;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }
}
