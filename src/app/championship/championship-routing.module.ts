import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { ChampionshipComponent }            from './championship.component';
import { ChampionshipHomeComponent }        from './championship-home/championship-home.component';
import { ChampionshipMatchComponent }       from './championship-match/championship-match.component';
import { ChampionshipPredictionsComponent } from './championship-predictions/championship-predictions.component';
import { ChampionshipRatingComponent }      from './championship-rating/championship-rating.component';
import { ChampionshipResultsComponent }     from './championship-results/championship-results.component';
import { ChampionshipRulesComponent }       from './championship-rules/championship-rules.component';
import { ChampionshipUserComponent }        from './championship-user/championship-user.component';

const routes: Routes = [
    {
        path: 'championship',
        component: ChampionshipComponent,
        children: [
            {
                path: 'predicts',
                redirectTo: '/championship/predictions',
                pathMatch: 'full'
            },
            {
                path: 'predictions',
                component: ChampionshipPredictionsComponent
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
                path: 'rules',
                component: ChampionshipRulesComponent
            },
            {
                path: 'users/:id',
                component: ChampionshipUserComponent
            },
            {
                path: 'matches/:id',
                component: ChampionshipMatchComponent
            },
            {
                path: 'home',
                component: ChampionshipHomeComponent
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ChampionshipRoutingModule {}