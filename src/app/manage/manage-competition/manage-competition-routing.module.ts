import { NgModule }                   from '@angular/core';
import { RouterModule, Routes }       from '@angular/router';

import { ManageCompetitionComponent } from './manage-competition.component';
import { CompetitionCreateComponent } from './competition-create/competition-create.component';
// import { ComponentEditComponent }     from './competition-edit/competition-edit.component';
// import { ComponentTableComponent }    from './competition-table/competition-table.component';
import { ManageCompetitionGuard }     from './shared/manage-competition-guard.service';

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
                    // { path: 'page/:number', component: ClubTableComponent },
                    { path: 'create', component: CompetitionCreateComponent },
                    // { path: ':id/edit', component: ClubEditComponent },
                    { path: '', component: CompetitionCreateComponent }
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