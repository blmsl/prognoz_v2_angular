import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { ManageNewsComponent }      from './manage-news.component';

const routes: Routes = [
    {
        path: 'manage/news',
        component: ManageNewsComponent
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ManageNewsRoutingModule {}