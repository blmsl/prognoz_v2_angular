import { NgModule }                         from '@angular/core';
import { RouterModule, Routes }             from '@angular/router';

import { ManageChampionshipComponent }      from './manage-championship.component';
import { ManageChampionshipGuard }          from './shared/manage-championship-guard.service';
import { MatchCreateComponent }             from './match-create/match-create.component';
import { MatchEditActiveComponent }         from './match-edit-active/match-edit-active.component';
import { MatchEditComponent }               from './match-edit/match-edit.component';

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
                    { path: 'matches/create', component: MatchCreateComponent },
                    { path: 'matches/edit', component: MatchEditComponent },
                    { path: 'matches/edit/active', component: MatchEditActiveComponent },
                    { path: '', component: MatchCreateComponent }
                    //{ path: 'matches/ended/edit', component: MatchActiveEditComponent },
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