import { CommonModule }       from '@angular/common';
import { NgModule }           from '@angular/core';

import { SharedModule }       from '../shared/shared.module';
import { TeamComponent }      from './team.component';
import { TeamRoutingModule }  from './team-routing.module';
import { TeamRulesComponent } from './team-rules/team-rules.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TeamRoutingModule
    ],
    declarations: [
        TeamComponent,
        TeamRulesComponent
    ],
    exports: [
        TeamComponent
    ]
})
export class TeamModule { }
