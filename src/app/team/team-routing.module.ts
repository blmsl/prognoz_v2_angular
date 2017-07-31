import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TeamComponent }        from './team.component';
import { TeamRulesComponent }   from './team-rules/team-rules.component';
import { TeamSquadsComponent }  from './team-squads/team-squads.component';

const routes: Routes = [
    {
        path: 'team',
        component: TeamComponent,
        children: [
            {
                path: 'rules',
                component: TeamRulesComponent
            },
            {
                path: 'squads',
                component: TeamSquadsComponent
            },
            {
                path: '',
                redirectTo: 'rules',
                pathMatch: 'full'
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class TeamRoutingModule {}