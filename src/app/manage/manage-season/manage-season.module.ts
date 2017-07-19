import { CommonModule }                 from '@angular/common';
import { NgModule }                     from '@angular/core';
import { ReactiveFormsModule }          from '@angular/forms';

import { ManageSeasonComponent }        from './manage-season.component';
import { ManageSeasonGuard }            from './shared/manage-season-guard.service';
import { ManageSeasonRoutingModule }    from './manage-season-routing.module';
import { SeasonCreateComponent }        from './season-create/season-create.component';
import { SeasonEditComponent }          from './season-edit/season-edit.component';
import { SeasonService }                from './shared/season.service';
import { SeasonTableComponent }         from './season-table/season-table.component';
import { SharedModule }                 from '../../core/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageSeasonRoutingModule,
        SharedModule
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
