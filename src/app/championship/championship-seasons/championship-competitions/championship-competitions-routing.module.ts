import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ChampionshipSeasonsRoutingModule }  from '../championship-seasons-routing.module';
import { ChampionshipComponent }             from '../../championship.component';
import { ChampionshipSeasonsComponent }      from '../championship-seasons.component';
import { ChampionshipCompetitionsComponent } from './championship-competitions.component';

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
                            // {
                            //     path: '',
                            //     component: ChampionshipCompetitionsListComponent
                            // },
                            // {
                            //     path: ':id',
                            //     component: ChampionshipCompetitionDetailComponent
                            // },
                            // {
                            //     path: ':id/rating',
                            //     component: ChampionshipCompetitionRatingComponent
                            // },
                            // {
                            //     path: ':id/results',
                            //     component: ChampionshipCompetitionResultsComponent
                            // },
                            // {
                            //     path: ':id/users/:id',
                            //     component: ChampionshipCompetitionUserComponent
                            // }
                        ]
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
