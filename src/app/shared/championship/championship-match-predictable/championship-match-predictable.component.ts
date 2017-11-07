import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup }                from '@angular/forms';

import { ChampionshipMatch }        from '../../models/championship-match.model';
import { ChampionshipMatchService } from '../../../championship/shared/championship-match.service';
import { environment }              from '../../../../environments/environment';

@Component({
  selector: 'app-championship-match-predictable',
  templateUrl: './championship-match-predictable.component.html',
  styleUrls: ['./championship-match-predictable.component.css']
})
export class ChampionshipMatchPredictableComponent implements OnChanges {

    @Input() match: ChampionshipMatch;
    @Input() authenticatedUser: any;
    @Input() championshipPredictsForm: FormGroup;

    constructor(
      private championshipMatchService: ChampionshipMatchService
    ) { }

    clubsImagesUrl: string = environment.apiImageClubs;
    errorStatistic: string | Array<string>;
    isCollapsed = true;
    resultChartData: any;
    resultChartLabels: any;
    resultChartType: string = 'doughnut';
    spinnerStatistic = false;
    statistic: any = false;

    getChampionshipMatchStatisticData(match: ChampionshipMatch) {
        if (this.isCollapsed) {
            this.spinnerStatistic = true;
            this.championshipMatchService.getChampionshipMatch(match.id, [{parameter: 'statistic', value: 'true'}])
                .subscribe(
                    response => {
                        this.isCollapsed = !this.isCollapsed;
                        this.resultChartLabels = [match.club_first.title, match.club_second.title, 'Нічия'];
                        this.resultChartData = [response.results.home, response.results.away, response.results.draw];
                        this.statistic = response;
                        this.spinnerStatistic = false;
                    },
                    error => {
                        this.isCollapsed = !this.isCollapsed;
                        this.errorStatistic = error;
                        this.spinnerStatistic = false;
                    }
                );
        } else {
            this.isCollapsed = !this.isCollapsed;
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        for (const propName in changes) {
            if (!changes[propName].firstChange && propName === 'match') {
                this.isCollapsed = true;
            }
        }
    }
}
