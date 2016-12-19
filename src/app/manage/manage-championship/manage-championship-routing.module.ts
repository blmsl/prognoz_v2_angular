import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { ManageChampionshipComponent }      from './manage-championship.component';
import { ManageChampionshipGuard }          from './shared/manage-championship-guard.service';
import { MatchCreateComponent }             from './match-create/match-create.component';

const routes: Routes = [
    {
        path: 'manage/championship',
        component: ManageChampionshipComponent,
        canActivate: [ ManageChampionshipGuard ],
        children: [
            {
                path: '',
                canActivateChild: [ ManageChampionshipGuard ],
                children: [
                    { path: 'matches/create', component: MatchCreateComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ManageChampionshipRoutingModule {}