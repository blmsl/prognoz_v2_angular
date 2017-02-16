import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { DirectivesModule }                 from '../../shared/directives/directives.module';
import { ManageChampionshipComponent }      from './manage-championship.component';
import { ManageChampionshipRoutingModule }  from './manage-championship-routing.module';
import { ManageChampionshipMatchService }   from './shared/manage-championship-match.service';
import { ManageChampionshipRatingService }  from './shared/manage-championship-rating.service';
import { ManageChampionshipGuard }          from './shared/manage-championship-guard.service';
import { MatchCreateComponent }             from './match-create/match-create.component';
import { MatchEditActiveComponent }         from './match-edit-active/match-edit-active.component';
import { MatchEditComponent }               from './match-edit/match-edit.component';
import { MatchEditEndedComponent }          from './match-edit-ended/match-edit-ended.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ManageChampionshipRoutingModule,
        DirectivesModule
    ],
    declarations: [
        ManageChampionshipComponent,
        MatchCreateComponent,
        MatchEditActiveComponent,
        MatchEditComponent,
        MatchEditEndedComponent
    ],
    providers: [
        ManageChampionshipMatchService,
        ManageChampionshipRatingService,
        ManageChampionshipGuard
    ]
})
export class ManageChampionshipModule { }
