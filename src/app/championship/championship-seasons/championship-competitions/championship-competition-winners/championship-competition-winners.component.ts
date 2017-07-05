import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { CompetitionService }             from '../../../../manage/manage-competition/shared/competition.service';
import { Competition }                    from '../../../../shared/models/competition.model';
import { environment }                    from '../../../../../environments/environment';

@Component({
    selector: 'app-championship-competition-winners',
    templateUrl: './championship-competition-winners.component.html',
    styleUrls: ['./championship-competition-winners.component.css']
})
export class ChampionshipCompetitionWinnersComponent implements OnInit {

    constructor(private competitionService: CompetitionService,
                private activatedRoute: ActivatedRoute,
                private router: Router) {
    }

    competition: Competition;
    spinnerCompetition: boolean = false;
    errorCompetition: string | Array<string>;

    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    awardsImagesUrl: string = environment.API_IMAGE_AWARDS;

    ngOnInit() {
        this.activatedRoute.params.forEach((params:Params) => {
            this.spinnerCompetition = true;
            this.resetData();
            this.competitionService.getCompetition(params['competitionId']).subscribe(
                response => {
                    if (response.tournament_id != environment.TOURNAMENTS.CHAMPIONSHIP.ID) {
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
