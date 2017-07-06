import { NgModule }                          from '@angular/core';
import { RouterModule, Routes }              from '@angular/router';

import { ChampionshipComponent }             from '../championship.component';
import { ChampionshipRoutingModule }         from '../championship-routing.module';
import { ChampionshipSeasonRatingComponent } from './championship-season-rating/championship-season-rating.component';
import { ChampionshipSeasonsComponent }      from './championship-seasons.component';

const routes: Routes = [
    {
        path: 'championship',
        component: ChampionshipComponent,
        children: [
            {
                path: 'seasons',
                component: ChampionshipSeasonsComponent,
                children: [
                    {
                        path: ':id/rating',
                        component: ChampionshipSeasonRatingComponent
                    }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        ChampionshipRoutingModule
    ],
    exports: [ RouterModule ]
})

export class ChampionshipSeasonsRoutingModule {}