import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';
import { ReactiveFormsModule }      from '@angular/forms';

import { SharedModule }             from '../shared/shared.module';
import { TeamComponent }            from './team.component';
import { TeamService }          from './shared/team.service';
import { TeamParticipantService }   from './shared/team-participant.service';
import { TeamRoutingModule }        from './team-routing.module';
import { TeamRulesComponent }       from './team-rules/team-rules.component';
import { TeamSquadsComponent }      from './team-squads/team-squads.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
        TeamRoutingModule
    ],
    declarations: [
        TeamComponent,
        TeamRulesComponent,
        TeamSquadsComponent
    ],
    exports: [
        TeamComponent
    ],
    providers: [
        TeamService,
        TeamParticipantService
    ]
})
export class TeamModule { }
