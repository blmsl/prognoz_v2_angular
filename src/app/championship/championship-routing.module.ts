import { NgModule }                      from '@angular/core';
import { RouterModule, Routes }          from '@angular/router';

import { ChampionshipComponent }         from './championship.component';
import { ChampionshipPredictsComponent } from './championship-predicts/championship-predicts.component';

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