import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { ChampionshipMatch }        from '../../../../shared/models/championship-match.model';
import { ChampionshipMatchService } from '../../../shared/championship-match.service';

@Component({
  selector: 'app-championship-competition-results',
  templateUrl: './championship-competition-results.component.html',
  styleUrls: ['./championship-competition-results.component.css']
})
export class ChampionshipCompetitionResultsComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private championshipMatchService: ChampionshipMatchService
    ) { }

    championshipMatches: ChampionshipMatch[];
    errorChampionshipMatches: string;
    spinnerChampionshipMatches: boolean = false;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.resetData();
            this.spinnerChampionshipMatches = true;
            let param = [
                {parameter: 'filter', value: 'ended'},
                {parameter: 'competition_id', value: params['competitionId']},
            ];
            this.championshipMatchService.getChampionshipMatches(param)
                .subscribe(
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
        });    
    }

    private resetData(): void {
        this.championshipMatches = null;
        this.errorChampionshipMatches = null;
    }

}