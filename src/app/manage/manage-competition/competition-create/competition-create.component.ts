import { Component, OnInit }    from '@angular/core';

import { CompetitionService }   from '../shared/competition.service';
import { Competition }          from '../shared/competition.model';

@Component({
  selector: 'app-competition-create',
  templateUrl: './competition-create.component.html',
  styleUrls: ['./competition-create.component.css']
})
export class CompetitionCreateComponent implements OnInit {

    constructor(
        private competitionService: CompetitionService
    ) { }

    spinner: boolean = false;
    error: string | boolean;
  
    ngOnInit() {
    }
}
