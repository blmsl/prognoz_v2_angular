import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';

import { DirectivesModule }                 from '../../shared/directives/directives.module';
import { ManageCompetitionComponent }       from './manage-competition.component';
import { CompetitionCreateComponent }       from './competition-create/competition-create.component';
import { ManageCompetitionRoutingModule }   from './manage-competition-routing.module';
import { ManageCompetitionGuard }           from './shared/manage-competition-guard.service';
import { CompetitionService }               from './shared/competition.service';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        ManageCompetitionRoutingModule
    ],
    declarations: [
        ManageCompetitionComponent,
        CompetitionCreateComponent
    ],
    providers: [
        ManageCompetitionGuard,
        CompetitionService
    ],
})
export class ManageCompetitionModule { }
