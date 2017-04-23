import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { DirectivesModule }                  from '../../shared/directives/directives.module';
import { ChampionshipCompetitionsModule }    from './championship-competitions/championship-competitions.module';
import { ChampionshipSeasonsRoutingModule }  from './championship-seasons-routing.module';

import { ChampionshipSeasonsComponent }      from './championship-seasons.component';
import { ChampionshipSeasonRatingComponent } from './championship-season-rating/championship-season-rating.component';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
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
