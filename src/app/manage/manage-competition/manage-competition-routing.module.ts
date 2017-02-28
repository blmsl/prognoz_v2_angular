import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import { ManageCompetitionComponent } from './manage-competition.component';
import { CompetitionCreateComponent } from './competition-create/competition-create.component';
import { ManageCompetitionGuard }     from './shared/manage-competition-guard.service';
import { CompetitionTableComponent }  from './competition-table/competition-table.component';
// import { ComponentEditComponent }  from './competition-edit/competition-edit.component';

const routes: Routes = [
    {
        path: 'manage/competitions',
        component: ManageCompetitionComponent,
        canActivate: [ ManageCompetitionGuard ],
        children: [
            {
                path: '',
                canActivateChild: [ ManageCompetitionGuard ],
                children: [
                    { path: 'page/:number', component: CompetitionTableComponent },
                    { path: 'create', component: CompetitionCreateComponent },
                    // { path: ':id/edit', component: ClubEditComponent },
                    { path: '', component: CompetitionTableComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ManageCompetitionRoutingModule {}