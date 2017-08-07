import { Component, EventEmitter,Input, OnInit, Output }    from '@angular/core';
import { FormControl, FormGroup, Validators }               from '@angular/forms';
import { Subscription }                                     from 'rxjs/Subscription';

import { Team }                                             from '../../models/team.model';
import { TeamService }                                      from '../../../team/shared/team.service';
import { User }                                             from '../../models/user.model';

@Component({
  selector: 'app-team-select-modal',
  templateUrl: './team-select-modal.component.html',
  styleUrls: ['./team-select-modal.component.css']
})
export class TeamSelectModalComponent implements OnInit {

    @Input() authenticatedUser: User;
    @Input() spinnerButton: boolean;
    @Output() onSubmitted = new EventEmitter<FormGroup>();

    errorTeams: string;
    spinnerTeams: boolean = false;
    teamSelectForm: FormGroup;
    teams: Team[];
    userSubscription: Subscription;

    constructor(
        private teamService: TeamService
    ) { }

    ngOnInit() {
        this.teamSelectForm = new FormGroup({
            team_id: new FormControl(null, [Validators.required]),
        });
        this.spinnerTeams = true;
        let param = [{parameter: 'captain_id', value: this.authenticatedUser.id.toString()}];
        this.teamService.getTeams(param).subscribe(
            response => {
                if (response) {
                    this.teams = response.teams;
                }
                this.spinnerTeams = false;
            },
            error => {
                this.errorTeams = error;
                this.spinnerTeams = false;
            }
        );
    }

    onSubmit() {
        if (this.teamSelectForm.valid) {
            this.onSubmitted.emit(this.teamSelectForm);
        }
    }
}
