import { CommonModule }             from '@angular/common';
import { NgModule }                 from '@angular/core';

import { ManageChampionshipModule } from './manage-championship/manage-championship.module';
import { ManageCompetitionModule }  from './manage-competition/manage-competition.module';
import { ManageComponent }          from './manage.component';
import { ManageClubModule }         from './manage-club/manage-club.module';
import { ManageGuard }              from './shared/manage-guard.service';
import { ManageNewsModule }         from './manage-news/manage-news.module';
import { ManageRoutingModule }      from './manage-routing.module';
import { ManageSeasonModule }       from './manage-season/manage-season.module';
import { ManageTournamentModule }   from './manage-tournament/manage-tournament.module';

@NgModule({
    imports: [
        CommonModule,
        ManageNewsModule,
        ManageClubModule,
        ManageChampionshipModule,
        ManageSeasonModule,
        ManageCompetitionModule,
        ManageTournamentModule,
        ManageRoutingModule
    ],
    declarations: [
        ManageComponent
    ],
    providers: [
        ManageGuard
    ],
    exports: [
        ManageComponent
    ]
})
export class ManageModule { }
