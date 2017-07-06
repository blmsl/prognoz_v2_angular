import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { ReactiveFormsModule }              from '@angular/forms';

import { CompetitionCreateComponent }       from './competition-create/competition-create.component';
import { CompetitionEditComponent }         from './competition-edit/competition-edit.component';
import { CompetitionService }               from './shared/competition.service';
import { CompetitionTableComponent }        from './competition-table/competition-table.component';
import { DirectivesModule }                 from '../../shared/directives/directives.module';
import { ManageCompetitionComponent }       from './manage-competition.component';
import { ManageCompetitionGuard }           from './shared/manage-competition-guard.service';
import { ManageCompetitionRoutingModule }   from './manage-competition-routing.module';

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
        CompetitionTableComponent,
        CompetitionEditComponent
    ],
    providers: [
        ManageCompetitionGuard,
        CompetitionService
    ],
})
export class ManageCompetitionModule { }
