import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';

import { ChampionshipComponent }         from './championship.component';
import { ChampionshipPredictsComponent } from './championship-predicts/championship-predicts.component';
import { ChampionshipRatingComponent }   from './championship-rating/championship-rating.component';
import { ChampionshipResultsComponent }  from './championship-results/championship-results.component';

const routes: Routes = [
    {
        path: 'championship',
        component: ChampionshipComponent,
        children: [
            {
                path: 'predicts',
                component: ChampionshipPredictsComponent
            },
            {
                path: 'rating',
                component: ChampionshipRatingComponent
            },
            {
                path: 'results',
                component: ChampionshipResultsComponent
            },
            {
                path: '',
                component: ChampionshipPredictsComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ChampionshipRoutingModule {}