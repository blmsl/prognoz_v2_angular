import { Component, Input, OnInit } from '@angular/core';

import { environment }              from '../../../../environments/environment';
import { TeamRating }               from '../../models/team-rating.model';
import { User }                     from '../../models/user.model';
import { HelperService }            from '../../../core/helper.service';

@Component({
    selector: 'app-team-rating-table',
    templateUrl: './team-rating-table.component.html',
    styleUrls: ['./team-rating-table.component.css']
})
export class TeamRatingTableComponent implements OnInit {

    @Input() teamRating: TeamRating[];
    @Input() spinnerTeamRating: boolean;
    @Input() errorTeamRating: string;
    @Input() authenticatedUser: User;

    noTeamRating: string = 'Командний чемпіонат ще не почався / рейтингу не знайдено';
    teamImageDefault: string = environment.imageTeamDefault;
    teamImagesUrl: string = environment.apiImageTeams;

    constructor(
        public helperService: HelperService
    ) {}

    ngOnInit() {
    }

}
