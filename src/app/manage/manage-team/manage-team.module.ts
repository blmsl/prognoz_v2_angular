import { CommonModule }                 from '@angular/common';
import { NgModule }                     from '@angular/core';
import { ReactiveFormsModule }          from '@angular/forms';

import { ManageTeamComponent }          from './manage-team.component';
import { ManageTeamGuard }              from './shared/manage-team-guard.service';
import { ManageTeamRoutingModule }      from './manage-team-routing.module';
import { SharedModule }                 from '../../shared/shared.module';
import { TeamMatchCreateComponent }     from './team-match-create/team-match-create.component';
import { TeamMatchService }             from './shared/team-match.service';

@NgModule({
    imports: [
        CommonModule,
        ManageTeamRoutingModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        ManageTeamComponent,
        TeamMatchCreateComponent,
    ],
    providers: [
        ManageTeamGuard,
        TeamMatchService
    ]
})
export class ManageTeamModule { }