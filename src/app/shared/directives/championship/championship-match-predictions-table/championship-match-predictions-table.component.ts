import { Component, Input }   from '@angular/core';

import { HelperService }      from '../../../helper.service';
import { ChampionshipMatch }  from '../../../models/championship-match.model';
import { User }               from '../../../models/user.model';

@Component({
  selector: 'app-championship-match-predictions-table',
  templateUrl: './championship-match-predictions-table.component.html',
  styleUrls: ['./championship-match-predictions-table.component.css']
})
export class ChampionshipMatchPredictionsTableComponent {

  @Input() match: ChampionshipMatch;
  @Input() authenticatedUser: User;

  constructor(
      public helperService: HelperService
  ) { }

}
