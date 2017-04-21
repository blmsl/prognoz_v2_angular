import { NgModule }                          from '@angular/core';
import { RouterModule, Routes }              from '@angular/router';

import { ChampionshipRoutingModule }         from '../championship-routing.module';
import { ChampionshipComponent }             from '../championship.component';
import { ChampionshipSeasonsComponent }      from './championship-seasons.component';
import { ChampionshipSeasonRatingComponent } from './championship-season-rating/championship-season-rating.component';

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
                    },
                    {
                        path: ':id',
                        //redirectTo: '/championship/seasons/:id/competitions',
                        redirectTo: ':id/competitions',
                        pathMatch: 'full'
                    },
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