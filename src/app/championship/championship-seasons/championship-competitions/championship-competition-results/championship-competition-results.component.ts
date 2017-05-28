import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { ChampionshipMatchService } from '../../../shared/championship-match.service';
import { UserService }              from '../../../../shared/user.service';
import { ChampionshipMatch }        from '../../../../shared/models/championship-match.model';

@Component({
  selector: 'app-championship-competition-results',
  templateUrl: './championship-competition-results.component.html',
  styleUrls: ['./championship-competition-results.component.css']
})
export class ChampionshipCompetitionResultsComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private championshipMatchService: ChampionshipMatchService,
        private userService: UserService
    ) { }
    
    authenticatedUser: any;
    matches: ChampionshipMatch[];
    errorMatches: string | Array<string>;
    spinnerMatches: boolean = false;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerMatches = true;
            let competitionId = +params['competitionId'];
            this.reloadComponent();
            this.championshipMatchService.getCurrentCompetitionMatches('ended', competitionId)
                .subscribe(
                    response => {
                        this.spinnerMatches = false;
                        this.matches = response;
                    },
                    error => {
                        this.spinnerMatches = false;
                        this.errorMatches = error;
                    }
                );
        });    
    }

    private reloadComponent() {
        this.matches = null;
        this.errorMatches = null;
    }

}