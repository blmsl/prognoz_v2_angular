import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { TeamTeamMatch }            from '../../shared/models/team-team-match.model';
import { TeamTeamMatchService }     from '../shared/team-team-match.service';

@Component({
    selector: 'app-team-predictions',
    templateUrl: './team-predictions.component.html',
    styleUrls: ['./team-predictions.component.css']
})
export class TeamPredictionsComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private teamTeamMatchService: TeamTeamMatchService
    ) { }

    errorTeamTeamMatches: string;
    nextRound: string;
    path: string = '/team/predictions/round/';
    previousRound: string;
    spinnerTeamTeamMatches: boolean = false;
    teamTeamMatches: TeamTeamMatch[];

    getTeamTeamMatchesData(round?: number) {
        this.spinnerTeamTeamMatches = true;
        this.teamTeamMatchService.getTeamTeamMatches(round).subscribe(
            response => {
                if (response) {
                    this.teamTeamMatches = response.data;
                    this.nextRound = response.next_page_url;
                    this.previousRound = response.prev_page_url;
                }
                this.spinnerTeamTeamMatches = false;
            },
            error => {
                this.errorTeamTeamMatches = error;
                this.spinnerTeamTeamMatches = false;
            }
        );
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.getTeamTeamMatchesData(params['round']);
        });
    }
}
