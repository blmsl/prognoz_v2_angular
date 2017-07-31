import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';

import { SharedModule }             from '../shared/shared.module';
import { TeamComponent }            from './team.component';
import { TeamInfoService }          from './shared/team-info.service';
import { TeamParticipantService }   from './shared/team-participant.service';
import { TeamRoutingModule }        from './team-routing.module';
import { TeamRulesComponent }       from './team-rules/team-rules.component';
import { TeamSquadsComponent }      from './team-squads/team-squads.component';

@NgModule({
    imports: [
        CommonModule,
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
        TeamInfoService,
        TeamParticipantService
    ]
})
export class TeamModule { }
