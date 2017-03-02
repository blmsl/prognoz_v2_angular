import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { ReactiveFormsModule }              from '@angular/forms';

import { DirectivesModule }                 from '../../shared/directives/directives.module';
import { ManageCompetitionComponent }       from './manage-competition.component';
import { CompetitionCreateComponent }       from './competition-create/competition-create.component';
import { ManageCompetitionRoutingModule }   from './manage-competition-routing.module';
import { ManageCompetitionGuard }           from './shared/manage-competition-guard.service';
import { CompetitionService }               from './shared/competition.service';
import { CompetitionTableComponent }        from './competition-table/competition-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        DirectivesModule,
        ManageCompetitionRoutingModule
    ],
    declarations: [
        ManageCompetitionComponent,
        CompetitionCreateComponent,
        CompetitionTableComponent
    ],
    providers: [
        ManageCompetitionGuard,
        CompetitionService
    ],
})
export class ManageCompetitionModule { }
