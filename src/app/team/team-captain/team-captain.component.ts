import { Component, OnInit }        from '@angular/core';
import { NgForm }                   from '@angular/forms';
import { ActivatedRoute, Params }   from '@angular/router';

import { TeamMatch }                from '../../shared/models/team-match.model';
import { TeamMatchService }         from '../../manage/manage-team/shared/team-match.service';
import { TeamParticipant }          from '../../shared/models/team-participant.model';
import { TeamParticipantService }   from '../shared/team-participant.service';

@Component({
    selector: 'app-team-captain',
    templateUrl: './team-captain.component.html',
    styleUrls: ['./team-captain.component.css']
})
export class TeamCaptainComponent implements OnInit {

    errorTeamMatches: string;
    errorTeamParticipants: string;
    isCaptain: boolean = false;
    spinnerTeamMatches: boolean = false;
    spinnerTeamParticipants: boolean = false;
    teamMatches: TeamMatch[];
    teamParticipants: TeamParticipant[];

    constructor(
        private activatedRoute: ActivatedRoute,
        private teamMatchService: TeamMatchService,
        private teamParticipantService: TeamParticipantService,
    ) {}

    getMyTeamMatchesData(round?: number) {
        this.resetMyTeamMatchesData();
        this.spinnerTeamMatches = true;
        let param = [{parameter: 'filter', value: 'my'}];
        if (round) param.push({parameter: 'round', value: round.toString()});
        this.teamMatchService.getTeamMatchesAuthUser(param).subscribe(
            response => {
                if (response) {
                    this.isCaptain = true;
                    this.teamMatches = response.team_matches;
                }
                this.spinnerTeamMatches = false;
            },
            error => {
                this.errorTeamMatches = error;
                this.spinnerTeamMatches = false;
            }
        );
    }

    getTeamParticipantsData() {
        this.spinnerTeamParticipants = true;
        let param = [{parameter: 'current', value: 'true'}];
        this.teamParticipantService.getCurrentTeamParticipants(param)
            .subscribe(
                response => {
                    if (response) {
                        this.teamParticipants = response.team_participants;
                    }
                    this.spinnerTeamParticipants = false;
                },
                error => {
                    this.errorTeamParticipants = error;
                    this.spinnerTeamParticipants = false;
                }
            );
    }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.getMyTeamMatchesData(params['round'] || null);
            this.getTeamParticipantsData();
        });
    }

    onSubmit(form) {
        console.log(form);
    }

    addTeamPredictor(addTeamPredictorForm: NgForm) {
        if (addTeamPredictorForm.value.user_id) {
            // send CREATE request
            // update strategy component
            // move required request from parent component
        }
    }

    private resetMyTeamMatchesData(): void {
        this.teamMatches = null;
        this.errorTeamMatches = null
    }
}
