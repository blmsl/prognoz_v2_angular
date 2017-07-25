import { CommonModule }                     from '@angular/common';
import { NgModule }                         from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageChampionshipComponent }      from './manage-championship.component';
import { ManageChampionshipGuard }          from './shared/manage-championship-guard.service';
import { ManageChampionshipRoutingModule }  from './manage-championship-routing.module';
import { MatchCreateComponent }             from './match-create/match-create.component';
import { MatchEditActiveComponent }         from './match-edit-active/match-edit-active.component';
import { MatchEditComponent }               from './match-edit/match-edit.component';
import { MatchEditEndedComponent }          from './match-edit-ended/match-edit-ended.component';
import { SharedModule }                     from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ManageChampionshipRoutingModule,
        SharedModule
    ],
    declarations: [
        ManageChampionshipComponent,
        MatchCreateComponent,
        MatchEditActiveComponent,
        MatchEditComponent,
        MatchEditEndedComponent
    ],
    providers: [
        ManageChampionshipGuard
    ]
})
export class ManageChampionshipModule { }
