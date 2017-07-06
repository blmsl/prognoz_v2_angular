import { NgModule }                                from '@angular/core';
import { RouterModule, Routes }                    from '@angular/router';

import { ChampionshipComponent }                   from '../../championship.component';
import { ChampionshipCompetitionRatingComponent }  from './championship-competition-rating/championship-competition-rating.component';
import { ChampionshipCompetitionResultsComponent } from './championship-competition-results/championship-competition-results.component';
import { ChampionshipCompetitionsComponent }       from './championship-competitions.component';
import { ChampionshipCompetitionUserComponent }    from './championship-competition-user/championship-competition-user.component';
import { ChampionshipCompetitionWinnersComponent } from './championship-competition-winners/championship-competition-winners.component';
import { ChampionshipSeasonsComponent }            from '../championship-seasons.component';
import { ChampionshipSeasonsRoutingModule }        from '../championship-seasons-routing.module';

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
                        path: ':id/competitions',
                        component: ChampionshipCompetitionsComponent,
                        children: [
                            {
                                path: ':competitionId/users/:userId',
                                component: ChampionshipCompetitionUserComponent
                            },
                            {
                                path: ':competitionId/rating',
                                component: ChampionshipCompetitionRatingComponent
                            },
                            {
                                path: ':competitionId/results',
                                component: ChampionshipCompetitionResultsComponent
                            },
                            {
                                path: ':competitionId/winners',
                                component: ChampionshipCompetitionWinnersComponent
                            },
                            {
                                path: ':competitionId',
                                redirectTo: ':competitionId/winners',
                                pathMatch: 'full'
                            },
                            // {
                            //     path: '',
                            //     component: ChampionshipCompetitionsListComponent
                            // },
                            // {
                            //     path: '',
                            //     redirectTo: 'competitions',
                            //     pathMatch: 'full'
                            // },
                        ]
                    },
                    {
                        path: ':id',
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
        ChampionshipSeasonsRoutingModule
    ],
    exports: [ RouterModule ]
})
export class ChampionshipCompetitionsRoutingModule { }
