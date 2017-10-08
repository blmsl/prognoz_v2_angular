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

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let param = [
                {parameter: 'filter', value: 'ended'},
                {parameter: 'competition_id', value: params['competitionId']},
            ];
            this.championshipMatchService.getChampionshipMatches(param)
                .subscribe(
                    response => {
                        this.resetChampionshipMatchesData();
                        if (response) {
                            this.championshipMatches = response.championship_matches;
                        }
                    },
                    error => {
                        this.resetChampionshipMatchesData();
                        this.errorChampionshipMatches = error;
                    }
                );
        });
    }

    private resetChampionshipMatchesData(): void {
        this.championshipMatches = null;
        this.errorChampionshipMatches = null;
    }
}
