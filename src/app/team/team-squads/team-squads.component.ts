import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer }                 from '@angular/platform-browser';
import { Subscription }                 from 'rxjs/Subscription';

import { AuthService }                  from '../../core/auth.service';
import { environment }                  from '../../../environments/environment';
import { CurrentStateService }          from '../../core/current-state.service';
import { TeamInfo }                     from '../../shared/models/team-info.model';
import { TeamInfoService }              from '../shared/team-info.service';
import { TeamParticipant }              from '../../shared/models/team-participant.model';
import { TeamParticipantService }       from '../shared/team-participant.service';
import { User }                         from '../../shared/models/user.model';

@Component({
  selector: 'app-team-squads',
  templateUrl: './team-squads.component.html',
  styleUrls: ['./team-squads.component.css']
})
export class TeamSquadsComponent implements OnDestroy, OnInit {

    constructor(
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private domSanitizer: DomSanitizer,
        private teamInfoService: TeamInfoService,
        private teamParticipantService: TeamParticipantService
    ) { }

    alreadyJoined: boolean = false;
    authenticatedUser: User = this.currentStateService.user;
    clubsImagesUrl: string = environment.apiImageClubs;
    errorTeamsInfo: string;
    userSubscription: Subscription;
    spinnerTeamsInfo: boolean = false;
    teamsImagesUrl: string = environment.apiImageTeams;
    teamImageDefault: string = environment.imageTeamDefault;
    teamsInfo: TeamInfo[];

    getTeamsInfoData() {
        this.spinnerTeamsInfo = true;
        this.resetData();
        this.teamInfoService.getTeamsInfo().subscribe(
            response => {
                if (response) {
                    this.isMemberOfTeam(response.team_infos);
                    this.teamsInfo = response.team_infos;
                }
                this.spinnerTeamsInfo = false;
            },
            error => {
                this.errorTeamsInfo = error;
                this.spinnerTeamsInfo = false;
            }
        );
    }

    isMemberOfTeam(teams: TeamInfo[]): void {
        if (this.authenticatedUser) {
            for (let team of teams) {
                if (team.team_participants.filter(participant => (participant.user_id === this.authenticatedUser.id && participant.confirmed)).length >= 1) {
                    this.alreadyJoined = true;
                }
            }
        }
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.getTeamsInfoData();
        });
        this.getTeamsInfoData();
    }

    numberOfConfirmedParticipants(participants: TeamParticipant[]): number {
        return participants.filter(participant => participant.confirmed).length;
    }

    showJoinButton(team: TeamInfo): boolean {
        if (!this.authenticatedUser) return false;
        if (this.authenticatedUser) {
            // current number of participants greater than 4
            if (team.team_participants.filter(participant => participant.confirmed).length >= 4) return false;
            // current user already joined
            if (team.team_participants.filter(participant => participant.user_id === this.authenticatedUser.id).length >= 1) return false;
            // current user application already cancelled
            if (team.team_participants.filter(participant => participant.user_id === this.authenticatedUser.id && participant.refused).length >= 1 ) return false;
        }

        return true;
    }

    statusColumnHtml(confirmed: boolean, refused: boolean, userId: number, captainId: number) {
        let innerHtml = '<span>Невідома помилка</span>';
        // show buttons
        if (this.authenticatedUser && captainId === this.authenticatedUser.id && !confirmed && !refused) {
            innerHtml = '<div class="btn-group" role="group" aria-label="Confirm or refuse">' +
                '<button type="button" class="btn btn-sm btn-success">Прийняти</button>' +
                '<button type="button" class="btn btn-sm btn-danger">Відхилити</button>' +
                '</div>';
        // show question icon
        } else if (!confirmed && !refused) {
            innerHtml = '<span class="text-info"><i aria-hidden="true" class="fa fa-lg fa-question-circle-o"></i> Очікується</span>';
        // show successful icon
        } else if (confirmed && !refused) {
            innerHtml = '<span class="text-success"><i aria-hidden="true" class="fa fa-lg fa-check-circle-o"></i> Підтверджено</span>';
        // show unsuccessful icon
        } else if (!confirmed && refused) {
            innerHtml = '<span class="text-danger"><i aria-hidden="true" class="fa fa-lg fa-times-circle-o"></i> Відхилено</span>';
        }

        return this.domSanitizer.bypassSecurityTrustHtml(innerHtml);
    }

    private resetData() {
        this.teamsInfo = null;
        this.errorTeamsInfo = null;
        this.alreadyJoined = false;
    }
}
