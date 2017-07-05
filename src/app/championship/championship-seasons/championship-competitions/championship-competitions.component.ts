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
    errorCompetitions: string;
    noCompetitions: string;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerCompetitions = true;
            this.resetData();
            this.competitionService.getCompetitions(null, environment.TOURNAMENTS.CHAMPIONSHIP.ID, params['id'])
                .subscribe(
                    response => {
                        if (!response) {
                            this.noCompetitions = 'В базі даних змагань не знайдено.'
                        } else {
                            this.competitions = response.competitions;
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

    private resetData(): void {
        this.competitions = null;
        this.errorCompetitions = null;
        this.noCompetitions = null;
    }
}
