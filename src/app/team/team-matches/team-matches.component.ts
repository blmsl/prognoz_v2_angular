import { Component, OnInit }        from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { Competition }              from '../../shared/models/competition.model';
import { CompetitionService }       from '../../manage/manage-competition/shared/competition.service';
import { environment }              from '../../../environments/environment';
import { TeamTeamMatch }            from '../../shared/models/team-team-match.model';
import { TeamTeamMatchService }     from '../shared/team-team-match.service';

@Component({
    selector: 'app-team-matches',
    templateUrl: './team-matches.component.html',
    styleUrls: ['./team-matches.component.css']
})
export class TeamMatchesComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private competitionService: CompetitionService,
        private teamTeamMatchService: TeamTeamMatchService
    ) { }

    competition: Competition;
    errorCompetition: string;
    errorTeamTeamMatches: string;
    spinnerCompetition: boolean;
    spinnerTeamTeamMatches: boolean;
    teamTeamMatches: TeamTeamMatch[];
    noTeamTeamMatches: string = 'Матчів не знайдено';
    nextRound: string;
    previousRound: string;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetTeamTeamMatchData();
            if (!params['round']) {
                this.getCompetitionData();
            } else {
                this.getTeamTeamMatchesData(params['round']);
            }

        });
    }

    getCompetitionData() {
        this.spinnerCompetition = true;
        this.competitionService.getCompetitions(null, environment.tournaments.team.id, null, true)
            .subscribe(
                response => {
                    if (response) {
                        this.competition = response.competition;
                        this.getTeamTeamMatchesData(response.competition.round);
                    }
                    this.spinnerCompetition = false;
                },
                error => {
                    this.errorCompetition = error;
                    this.spinnerCompetition = false;
                }
            );
    }

    getTeamTeamMatchesData(round: number) {
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

    private resetTeamTeamMatchData(): void {
        this.errorTeamTeamMatches = null;
        this.teamTeamMatches = null;
        this.nextRound = null;
        this.previousRound = null;
    }
}
