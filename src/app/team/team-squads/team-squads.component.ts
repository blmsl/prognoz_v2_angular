import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { DomSanitizer }                         from '@angular/platform-browser';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../core/auth.service';
import { environment }                          from '../../../environments/environment';
import { CurrentStateService }                  from '../../core/current-state.service';
import { NotificationsService }                 from 'angular2-notifications';
import { Team }                                 from '../../shared/models/team.model';
import { TeamService }                          from '../shared/team.service';
import { TeamParticipant }                      from '../../shared/models/team-participant.model';
import { TeamParticipantService }               from '../shared/team-participant.service';
import { User }                                 from '../../shared/models/user.model';

declare var $: any;

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
        private notificationsService: NotificationsService,
        private teamService: TeamService,
        private teamParticipantService: TeamParticipantService
    ) { }

    alreadyJoined: boolean = false;
    authenticatedUser: User = this.currentStateService.user;
    clubsImagesUrl: string = environment.apiImageClubs;
    errorTeamsInfo: string;
    noParticipants: string = 'Заявок поки що немає.';
    spinnerButton: boolean = false;
    spinnerTeamsInfo: boolean = false;
    teamImageDefault: string = environment.imageTeamDefault;
    teamCreateForm: FormGroup;
    teamsImagesUrl: string = environment.apiImageTeams;
    teams: Team[];
    userSubscription: Subscription;

    getTeamsData() {
        this.spinnerTeamsInfo = true;
        this.resetData();
        this.teamService.getTeams().subscribe(
            response => {
                if (response) {
                    this.isMemberOfTeam(response.teams);
                    this.teams = response.teams;
                }
                this.spinnerTeamsInfo = false;
            },
            error => {
                this.errorTeamsInfo = error;
                this.spinnerTeamsInfo = false;
            }
        );
    }

    isMemberOfTeam(teams: Team[]): void {
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
            this.getTeamsData();
        });
        this.getTeamsData();
        this.teamCreateForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            image: new FormControl(null, []),
            caption: new FormControl(null, [Validators.maxLength(140)]),
            club_id: new FormControl(null, [])
        });
    }

    numberOfConfirmedParticipants(participants: TeamParticipant[]): number {
        return participants.filter(participant => participant.confirmed).length;
    }

    onSubmitted(teamCreateForm: FormGroup) {
        if (teamCreateForm.valid) {
            this.spinnerButton = true;
            this.teamService.createTeam(teamCreateForm.value)
                .subscribe(
                    response => {
                        this.notificationsService.success('Успішно', 'Команду ' + response.name +' створено');
                        $('#teamEditModal').modal('hide');
                        this.teamCreateForm.reset({image: null});
                        let teamParticipant = {
                            team_id: response.id,
                            user_id: this.authenticatedUser.id,
                            captain: true,
                            confirmed: true
                        };
                        this.teamParticipantService.createTeamParticipant(teamParticipant).subscribe(
                            response => {
                                this.getTeamsData();
                                this.notificationsService.success('Успішно', 'Заявку в команду подано');
                            },
                            errors => {
                                for (let error of errors) {
                                    this.notificationsService.error('Помилка', error);
                                }
                            }
                        );
                        this.spinnerButton = false;
                    },
                    errors => {
                        for (let error of errors) {
                            this.notificationsService.error('Помилка', error);
                        }
                        this.spinnerButton = false;
                    }
                );
        }
    }

    showJoinButton(team: Team): boolean {
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
        this.teams = null;
        this.errorTeamsInfo = null;
        this.alreadyJoined = false;
    }
}
