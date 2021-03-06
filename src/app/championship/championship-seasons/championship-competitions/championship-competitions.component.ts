import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Competition }              from '../../../shared/models/competition.model';
import { CompetitionService }       from '../../../manage/manage-competition/shared/competition.service';
import { environment }              from '../../../../environments/environment';
import { TitleService }             from '../../../core/title.service';

@Component({
  selector: 'app-championship-competitions',
  templateUrl: './championship-competitions.component.html',
  styleUrls: ['./championship-competitions.component.css']
})
export class ChampionshipCompetitionsComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private competitionService: CompetitionService,
        private titleService: TitleService
    ) { }

    competitions: Competition[];
    errorCompetitions: string;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.titleService.setTitle(`Конкурси сезону ${params['id']} - Чемпіонат`);
            this.competitionService.getCompetitions(null, environment.tournaments.championship.id, params['id'])
                .subscribe(
                    response => {
                        this.resetCompetitionsData();
                        if (response) {
                            this.competitions = response.competitions;
                        }
                    },
                    error => {
                        this.resetCompetitionsData();
                        this.errorCompetitions = error;
                    }
                );
        });
    }

    private resetCompetitionsData(): void {
        this.competitions = null;
        this.errorCompetitions = null;
    }
}
