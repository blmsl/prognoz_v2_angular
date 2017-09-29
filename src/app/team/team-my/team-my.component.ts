import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { ActivatedRoute, Params }               from '@angular/router';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../core/auth.service';
import { CurrentStateService }                  from '../../core/current-state.service';
import { NotificationsService }                 from 'angular2-notifications';
import { Team }                                 from '../../shared/models/team.model';
import { TeamService }                          from '../shared/team.service';
import { TeamTeamMatch }                        from '../../shared/models/team-team-match.model';
import { TeamTeamMatchService }                 from '../shared/team-team-match.service';
import { User }                                 from '../../shared/models/user.model';

declare var $: any;

@Component({
    selector: 'app-team-my',
    templateUrl: './team-my.component.html',
    styleUrls: ['./team-my.component.css']
})
export class TeamMyComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private notificationsService: NotificationsService,
        private teamService: TeamService,
        private teamTeamMatchService: TeamTeamMatchService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    errorTeam: string;
    errorTeamTeamMatches: string;
    isCaptain: boolean = false;
    nextRound: string;
    noAccess: string = 'Доступ заборонено. Увійдіть на сайт для перегляду цієї сторінки.';
    path: string = '/team/my/round/';
    previousRound: string;
    spinnerTeam: boolean = false;
    spinnerTeamTeamMatches: boolean = false;
    spinnerButtonTeamEditForm: boolean = false;
    team: Team;
    teamEditForm: FormGroup;
    teamEditFormHasUnsavedChanges: boolean = false;
    teamTeamMatches: TeamTeamMatch[];
    userSubscription: Subscription;

    getTeamTeamMatchesData(round?: number) {
        this.spinnerTeamTeamMatches = true;
        this.resetTeamTeamMatchesData();
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

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(response => {
            this.authenticatedUser = response;
            if (response) {
                this.getTeamData();
            } else {
                this.isCaptain = false;
            }
        });

        this.activatedRoute.params.subscribe((params: Params) => {
            this.getTeamTeamMatchesData(params['round']);
            if (this.authenticatedUser) {
                this.getTeamData();
            }
        });

        this.teamEditForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
            image: new FormControl(null, []),
            caption: new FormControl(null, [Validators.maxLength(140)]),
            club_id: new FormControl(null, [])
        });
    }

    onSubmitted(teamEditForm: FormGroup) {
        if (teamEditForm.valid) {
            this.spinnerButtonTeamEditForm = true;
            teamEditForm.value.id = this.team.id;
            this.teamService.updateTeam(teamEditForm.value).subscribe(
                response => {
                    if (response) this.team = Object.assign({}, response);
                    $('#teamEditModal').modal('hide');
                    this.notificationsService.success('Успішно', 'Команду редаговано');
                    this.spinnerButtonTeamEditForm = false;
                    this.teamEditFormHasUnsavedChanges = false;
                },
                errors => {
                    errors.forEach(error => this.notificationsService.error('Помилка', error));
                    this.spinnerButtonTeamEditForm = false;
                    this.teamEditFormHasUnsavedChanges = false;
                }
            );
        }
    }

    private getTeamData() {
        this.spinnerTeam = true;
        this.resetTeamData();
        let param = [{parameter: 'user_id', value: this.authenticatedUser.id.toString()}];
        this.teamService.getTeam(null, param).subscribe(
            response => {
                if (response) {
                    this.team = Object.assign({}, response);
                    if (this.team.captain_id === this.authenticatedUser.id) {
                        this.isCaptain = true;
                        this.teamEditForm.patchValue({
                            name: this.team.name,
                            caption: this.team.caption,
                            club_id: this.team.club_id,
                            image: null
                        });
                    }
                }
                this.spinnerTeam = false;
            },
            error => {
                this.errorTeam = error;
                this.spinnerTeam = false;
            }
        );
    }

    private resetTeamData(): void {
        this.team = null;
        this.errorTeam = null;
    }

    private resetTeamTeamMatchesData(): void {
        this.teamTeamMatches = null;
        this.errorTeamTeamMatches = null;
    }
}
