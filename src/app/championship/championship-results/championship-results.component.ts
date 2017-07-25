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

    championshipMatches: ChampionshipMatch[];
    clubsImagesUrl: string = environment.apiImageClubs;
    errorChampionshipMatches: string;
    spinnerChampionshipMatches: boolean = false;

    ngOnInit() {
        this.spinnerChampionshipMatches = true;
        let param = [{parameter: 'filter', value: 'ended'}];
        this.championshipMatchService.getChampionshipMatches(param).subscribe(
            response => {
                if (response) {
                    this.championshipMatches = response.championship_matches;
                }
                this.spinnerChampionshipMatches = false;
            },
            error => {
                this.errorChampionshipMatches = error;
                this.spinnerChampionshipMatches = false;
            }
        );
    }
}
