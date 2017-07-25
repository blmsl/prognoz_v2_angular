import { CommonModule }                      from '@angular/common';
import { NgModule }                          from '@angular/core';

import { ChampionshipCompetitionsModule }    from './championship-competitions/championship-competitions.module';
import { ChampionshipSeasonRatingComponent } from './championship-season-rating/championship-season-rating.component';
import { ChampionshipSeasonsComponent }      from './championship-seasons.component';
import { ChampionshipSeasonsRoutingModule }  from './championship-seasons-routing.module';
import { SharedModule }                      from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ChampionshipSeasonsRoutingModule,
        ChampionshipCompetitionsModule
    ],
    declarations: [
        ChampionshipSeasonsComponent,
        ChampionshipSeasonRatingComponent
    ],
    exports: [
        ChampionshipSeasonsComponent
    ],
})
export class ChampionshipSeasonsModule { }
