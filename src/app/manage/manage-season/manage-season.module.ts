import { CommonModule }                 from '@angular/common';
import { NgModule }                     from '@angular/core';
import { ReactiveFormsModule }          from '@angular/forms';

import { DirectivesModule }             from '../../shared/directives/directives.module';
import { ManageSeasonComponent }        from './manage-season.component';
import { ManageSeasonGuard }            from './shared/manage-season-guard.service';
import { ManageSeasonRoutingModule }    from './manage-season-routing.module';
import { SeasonCreateComponent }        from './season-create/season-create.component';
import { SeasonEditComponent }          from './season-edit/season-edit.component';
import { SeasonService }                from './shared/season.service';
import { SeasonTableComponent }         from './season-table/season-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageSeasonRoutingModule,
        DirectivesModule
    ],
    declarations: [
        ManageSeasonComponent,
        SeasonCreateComponent,
        SeasonTableComponent,
        SeasonEditComponent
    ],
    providers: [
        ManageSeasonGuard,
        SeasonService
    ]
})
export class ManageSeasonModule { }
