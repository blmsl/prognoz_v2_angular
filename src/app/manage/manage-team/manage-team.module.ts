import { CommonModule }                 from '@angular/common';
import { NgModule }                     from '@angular/core';

import { ManageTeamComponent }          from './manage-team.component';
import { ManageTeamGuard }              from './shared/manage-team-guard.service';
import { ManageTeamRoutingModule }      from './manage-team-routing.module';
import { SharedModule }                 from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ManageTeamRoutingModule,
        SharedModule,
    ],
    declarations: [
        ManageTeamComponent,
    ],
    providers: [
        ManageTeamGuard,
    ]
})
export class ManageTeamModule { }