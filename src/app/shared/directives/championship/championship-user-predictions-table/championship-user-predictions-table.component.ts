import { Component, Input }     from '@angular/core';

import { ChampionshipPredict }  from '../../../models/championship-predict.model';
import { HelperService }        from '../../../helper.service';

@Component({
  selector: 'app-championship-user-predictions-table',
  templateUrl: './championship-user-predictions-table.component.html',
  styleUrls: ['./championship-user-predictions-table.component.css']
})
export class ChampionshipUserPredictionsTableComponent {

  @Input() predictions: ChampionshipPredict[];
  @Input() spinner: boolean;
  @Input() error: string;

  constructor(
      public helperService: HelperService
  ) { }

}
