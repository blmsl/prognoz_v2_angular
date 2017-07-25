import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Competition }                    from '../../../../shared/models/competition.model';
import { CompetitionService }             from '../../../../manage/manage-competition/shared/competition.service';
import { environment }                    from '../../../../../environments/environment';

@Component({
    selector: 'app-championship-competition-winners',
    templateUrl: './championship-competition-winners.component.html',
    styleUrls: ['./championship-competition-winners.component.css']
})
export class ChampionshipCompetitionWinnersComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private competitionService: CompetitionService,
        private router: Router
    ) { }

    awardsImagesUrl: string = environment.apiImageAwards;
    competition: Competition;
    errorCompetition: string | Array<string>;
    spinnerCompetition: boolean = false;
    userImageDefault: string = environment.imageUserDefault;
    userImagesUrl: string = environment.apiImageUsers;

    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            this.spinnerCompetition = true;
            this.resetData();
            this.competitionService.getCompetition(params['competitionId']).subscribe(
                response => {
                    if (response.tournament_id != environment.tournaments.championship.id) {
                        this.router.navigate(['/404']);
                    }
                    this.competition = response;
                    this.spinnerCompetition = false;
                },
                error => {
                    this.errorCompetition = error;
                    this.spinnerCompetition = false;
                }
            );
        });
    }

    private resetData(): void {
        this.competition = null;
        this.errorCompetition = null;
    }
}
