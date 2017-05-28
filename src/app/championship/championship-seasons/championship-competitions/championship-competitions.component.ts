import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { CompetitionService }       from '../../../manage/manage-competition/shared/competition.service';
import { Competition }              from '../../../shared/models/competition.model';
import { environment }              from '../../../../environments/environment';

@Component({
  selector: 'app-championship-competitions',
  templateUrl: './championship-competitions.component.html',
  styleUrls: ['./championship-competitions.component.css']
})
export class ChampionshipCompetitionsComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private competitionService: CompetitionService
    ) { }

    competitions: Competition[];
    spinnerCompetitions: boolean = false;
    errorCompetitions: string | Array<string>;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerCompetitions = true;
            let season = +params['id'];
            this.reloadComponent();
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

    private reloadComponent() {
        this.competitions = null;
        this.errorCompetitions = null;
    }
}
