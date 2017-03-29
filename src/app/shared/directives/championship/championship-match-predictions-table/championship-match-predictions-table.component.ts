import { Component, Input }   from '@angular/core';

import { ChampionshipMatch }  from '../../../models/championship-match.model';
import { HelperService }      from '../../../helper.service';

@Component({
  selector: 'app-championship-match-predictions-table',
  templateUrl: './championship-match-predictions-table.component.html',
  styleUrls: ['./championship-match-predictions-table.component.css']
})
export class ChampionshipMatchPredictionsTableComponent {

  @Input() match: ChampionshipMatch;

  constructor(
      public helperService: HelperService
  ) { }

}
