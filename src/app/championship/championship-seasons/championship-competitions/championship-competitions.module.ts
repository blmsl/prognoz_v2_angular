import { NgModule }                          from '@angular/core';
import { CommonModule }                      from '@angular/common';

import { DirectivesModule }                  from '../../../shared/directives/directives.module';
import { ChampionshipCompetitionsComponent } from './championship-competitions.component';
import { ChampionshipCompetitionsListComponent } from './championship-competitions-list/championship-competitions-list.component';
import { ChampionshipCompetitionsRoutingModule } from './championship-competitions-routing.module';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        ChampionshipCompetitionsRoutingModule
    ],
    declarations: [
        ChampionshipCompetitionsComponent,
        ChampionshipCompetitionsListComponent
    ],
    exports: [
        ChampionshipCompetitionsComponent
    ]
})
export class ChampionshipCompetitionsModule { }
