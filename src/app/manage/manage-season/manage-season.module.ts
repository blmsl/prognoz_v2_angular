import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { DirectivesModule }             from '../../shared/directives/directives.module';
import { ManageSeasonComponent }        from './manage-season.component';
import { ManageSeasonRoutingModule }    from './manage-season-routing.module';
import { SeasonService }                from './shared/season.service';
import { ManageSeasonGuard }            from './shared/manage-season-guard.service';
import { SeasonCreateComponent }        from './season-create/season-create.component';
import { SeasonTableComponent }         from './season-table/season-table.component';
import { SeasonEditComponent }          from './season-edit/season-edit.component';

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
