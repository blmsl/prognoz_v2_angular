import { Component, Input, OnInit } from '@angular/core';

import { environment }              from '../../../../environments/environment';
import { HelperService }            from '../../../core/helper.service';
import { TeamMatch }                from '../../models/team-match.model';
import { TeamMatchService }         from '../../../manage/manage-team/shared/team-match.service';
import { TeamTeamMatch }            from '../../models/team-team-match.model';

@Component({
    selector: 'app-team-team-match-card',
    templateUrl: './team-team-match-card.component.html',
    styleUrls: ['./team-team-match-card.component.css']
})
export class TeamTeamMatchCardComponent implements OnInit {

    constructor(
        private teamMatchService: TeamMatchService,
        public helperService: HelperService
    ) {}

    @Input() teamTeamMatch: TeamTeamMatch;
    @Input() round: number;

    clubsImagesUrl: string = environment.apiImageClubs;
    errorTeamMatches: string;
    expandedTeamMatch: boolean;
    noTeamMatches: string = 'Цей раунд ще не почався / матчів не знайдено';
    spinnerTeamMatches: boolean;
    teamImageDefault: string = environment.imageTeamDefault;
    teamsImagesUrl: string = environment.apiImageTeams;
    teamMatches: TeamMatch[];
    userImageDefault: string = environment.imageUserDefault;
    userImagesUrl: string = environment.apiImageUsers;

    getTeamTeamMatchData(teamTeamMatch: TeamTeamMatch) {
        if (!this.expandedTeamMatch) {
            this.expandedTeamMatch = true;
            this.spinnerTeamMatches = true;
            setTimeout(() => {
                let param = [{parameter: 'filter', value: 'team-team-match'}];
                param.push({parameter: 'home_team_id', value: teamTeamMatch.home_team_id.toString()});
                param.push({parameter: 'away_team_id', value: teamTeamMatch.away_team_id.toString()});
                if (this.round) param.push({parameter: 'round', value: this.round.toString()});
                this.teamMatchService.getTeamMatches(param).subscribe(
                    response => {
                        if (response) this.teamMatches = response.team_matches;
                        this.spinnerTeamMatches = false;
                    },
                    error => {
                        this.errorTeamMatches = error;
                        this.spinnerTeamMatches = false;
                    }
                );
            }, 1000);
        } else {
            this.expandedTeamMatch = false;
            setTimeout(() => this.resetTeamMatchesData(), 500);
        }
    }

    getPredictionDetails(teamMatch: TeamMatch, teamId: number): {name: string, prediction: string, predicted_at: string} {
        if (teamMatch.is_predictable) {
            return {name: '?', prediction: '?', predicted_at: '?'};
        } else if (teamMatch.team_predictions) {
            let teamPrediction = teamMatch.team_predictions.find((teamPrediction) => teamId === teamPrediction.team_id);
            if (teamPrediction) {
                return {
                    name: teamPrediction.user ? teamPrediction.user.name : '-',
                    prediction: this.helperService.isScore(teamPrediction.home, teamPrediction.away)
                        ? `${teamPrediction.home} : ${teamPrediction.away}` : '-',
                    predicted_at: this.helperService.isScore(teamPrediction.home, teamPrediction.away)
                        ? teamPrediction.predicted_at : '-'
                };
            }
        }
        return {name: '-', prediction: '-', predicted_at: '-'};
    }

    ngOnInit() {
    }

    private resetTeamMatchesData(): void {
        this.teamMatches = null;
        this.errorTeamMatches = null;
    }
}
