import { Component, Input }   from '@angular/core';

import { environment }        from '../../../../../environments/environment';
import { ChampionshipMatch }  from '../../../models/championship-match.model';
import { ChampionshipMatchService } from '../../../../championship/shared/championship-match.service';

@Component({
  selector: 'app-championship-match-predictable',
  templateUrl: './championship-match-predictable.component.html',
  styleUrls: ['./championship-match-predictable.component.css']
})
export class ChampionshipMatchPredictableComponent {

  @Input() match: ChampionshipMatch;
  @Input() authenticatedUser: any;

  constructor(
      private championshipMatchService: ChampionshipMatchService
  ) { }

  clubsImagesUrl: string = environment.API_IMAGE_CLUBS;

  // statistic
  statistic: any = false;
  errorStatistic: string | Array<string>;
  spinnerStatistic: boolean = false;
  expandedStatistic: boolean = false;
  // result
  resultChartLabels: any;
  resultChartType: string = 'doughnut';
  resultChartData: any;

  getStatistic(match: ChampionshipMatch) {
      if (!this.expandedStatistic) {
          this.expandedStatistic = true;
          this.spinnerStatistic = true;
          setTimeout(() =>
                  this.championshipMatchService.getStatistic(match.id).subscribe(
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

}
