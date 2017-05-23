import { Component, OnInit }                from '@angular/core';
import { ActivatedRoute, Params, Router }   from '@angular/router';

import { CompetitionService }               from '../../../../manage/manage-competition/shared/competition.service';
import { Competition }                      from '../../../../shared/models/competition.model';
import { environment }                      from '../../../../../environments/environment';

@Component({
  selector: 'app-championship-competitions-list',
  templateUrl: './championship-competitions-list.component.html',
  styleUrls: ['./championship-competitions-list.component.css']
})
export class ChampionshipCompetitionsListComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private competitionService: CompetitionService
    ) { }
    
    competitions: Competition[];
    spinnerCompetitions: boolean = false;
    errorCompetitions: string | Array<string>;
  
    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerCompetitions = true;
            this.competitions = null;
            this.errorCompetitions = null;
            let season = +params['id'];
            this.competitionService.get(null, environment.TOURNAMENTS.CHAMPIONSHIP.ID, season).subscribe(
                response => {
                    if (response.status === 204) {
                        this.errorCompetitions = 'Цей сезон немає змагань';
                    } else {
                        this.competitions = response;
                    }
                    this.spinnerCompetitions = false;
                },
                error => {
                    this.errorCompetitions = error;
                    this.spinnerCompetitions = false;
                }
            );
        });
    }

}
