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

    errorTeamMatches: string;
    expandedTeamMatch: boolean;
    noTeamMatches: string = 'В базі даних матчів не зайдено';
    spinnerTeamMatches: boolean;
    teamImageDefault: string = environment.imageTeamDefault;
    teamsImagesUrl: string = environment.apiImageTeams;
    teamMatches: TeamMatch[];

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

    getPredictionDetails(teamMatch: TeamMatch, teamId: number): {name: string, prediction: string} {
        if (teamMatch.is_predictable) {
            return {name: '?', prediction: '?'};
        } else if (teamMatch.team_predictions) {
            let teamPrediction = teamMatch.team_predictions.find((teamPrediction) => teamId === teamPrediction.team_id);
            if (teamPrediction) {
                return {
                    name: teamPrediction.user ? teamPrediction.user.name : '-',
                    prediction: this.helperService.isScore(teamPrediction.home, teamPrediction.away)
                        ? `${teamPrediction.home} : ${teamPrediction.away}` : '-'
                };
            }
        }
        return {name: '-', prediction: '-'};
    }

    isTeamMatchGuessed(teamMatch: TeamMatch, teamId: number): boolean {
        if (!teamMatch.ended) return false;
        if (teamMatch.team_predictions) {
            let teamPrediction = teamMatch.team_predictions.find((teamPrediction) => teamId === teamPrediction.team_id);
            if (!teamPrediction) return false;
            if (this.helperService.getUserPointsOnMatch(teamMatch.home, teamMatch.away, teamPrediction.home, teamPrediction.away) === 3) {
                return true;
            }
        }

        return false;
    }

    isTeamMatchBlocked(teamMatch: TeamMatch, teamId: number): boolean {
        if (!teamMatch.ended) return false;
        if (teamMatch.team_predictions) {
            let teamPrediction = teamMatch.team_predictions.find((teamPrediction) => teamId === teamPrediction.team_id);
            if (!teamPrediction) return false;
            if (teamPrediction.blocked_by) return true;
        }

        return false;
    }

    ngOnInit() {
    }

    private resetTeamMatchesData(): void {
        this.teamMatches = null;
        this.errorTeamMatches = null;
    }
}
