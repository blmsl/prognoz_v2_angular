import {Component, Input, OnInit, OnChanges, SimpleChanges} from '@angular/core';

import { environment }                                      from '../../../../environments/environment';
import { TeamRatingUser }                                   from '../../models/team-rating-user.model';
import { User }                                             from '../../models/user.model';

@Component({
    selector: 'app-team-rating-user-table',
    templateUrl: './team-rating-user-table.component.html',
    styleUrls: ['./team-rating-user-table.component.css']
})
export class TeamRatingUserTableComponent implements OnChanges, OnInit {

    @Input() teamRatingUser: TeamRatingUser[];
    @Input() spinnerTeamRatingUser: boolean;
    @Input() errorTeamRatingUser: string;
    @Input() authenticatedUser: User;

    goalkeepersRating: TeamRatingUser[];
    noTeamRatingUser: string = 'Командний чемпіонат ще не почався / рейтингу гравців не знайдено';
    teamImageDefault: string = environment.imageTeamDefault;
    teamImagesUrl: string = environment.apiImageTeams;
    topScorersRating: TeamRatingUser[];
    userImageDefault: string = environment.imageUserDefault;
    userImagesUrl: string = environment.apiImageUsers;

    constructor() {
    }

    ngOnChanges(changes: SimpleChanges) {
        for (let propName in changes) {
            if (!changes[propName].firstChange && propName === 'teamRatingUser') {
                this.topScorersRating = this.formTeamUserRating(changes[propName].currentValue, 'scored');
                this.goalkeepersRating = this.formTeamUserRating(changes[propName].currentValue, 'blocked');
            }
        }
    }

    ngOnInit() {
    }

    private filterTeamUserRating(teamRatingUser: TeamRatingUser[], column: string): TeamRatingUser[] {
        return teamRatingUser.filter(ratingItem => ratingItem[column]);
    }

    private sortTeamUserRating(teamRatingUser: TeamRatingUser[], column: string): TeamRatingUser[] {
        return teamRatingUser.sort((a, b) => b[column] - a[column]);
    }

    private formTeamUserRating(teamRatingUser: TeamRatingUser[], column: string = 'scored'): TeamRatingUser[] {
        let filtered = this.filterTeamUserRating(teamRatingUser, column);
        return this.sortTeamUserRating(filtered, column);
    }
}
