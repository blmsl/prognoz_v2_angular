import { Component, Input }         from '@angular/core';
import { FormGroup }                from '@angular/forms';

import { ChampionshipMatch }        from '../../models/championship-match.model';
import { ChampionshipMatchService } from '../../../championship/shared/championship-match.service';
import { environment }              from '../../../../environments/environment';

@Component({
  selector: 'app-championship-match-predictable',
  templateUrl: './championship-match-predictable.component.html',
  styleUrls: ['./championship-match-predictable.component.css']
})
export class ChampionshipMatchPredictableComponent {

    @Input() match: ChampionshipMatch;
    @Input() authenticatedUser: any;
    @Input() championshipPredictsForm: FormGroup;

    constructor(
      private championshipMatchService: ChampionshipMatchService
    ) { }

    clubsImagesUrl: string = environment.apiImageClubs;

    statistic: any = false;
    errorStatistic: string | Array<string>;
    spinnerStatistic: boolean = false;
    expandedStatistic: boolean = false;

    resultChartLabels: any;
    resultChartType: string = 'doughnut';
    resultChartData: any;

    getChampionshipMatchStatisticData(match: ChampionshipMatch) {
          if (!this.expandedStatistic) {
              this.expandedStatistic = true;
              this.spinnerStatistic = true;
              setTimeout(() =>
                  this.championshipMatchService.getChampionshipMatch(match.id, [{parameter: 'statistic', value: 'true'}])
                      .subscribe(
                          response => {
                              this.resultChartLabels = [match.club_first.title, match.club_second.title, 'Нічия'];
                              this.resultChartData = [response.results.home, response.results.away, response.results.draw];
                              this.statistic = response;
                              this.spinnerStatistic = false;
                          },
                          error => {
                              this.errorStatistic = error;
                              this.spinnerStatistic = false;
                          }
                      )
              , 1000);
          } else {
              this.expandedStatistic = false;
          }
    }

    onClick(e: Event) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
}
