import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { ManageNewsComponent }      from './manage-news.component';
import { NewsTableComponent }       from './news-table/news-table.component';
import { ManageNewsGuard }          from './shared/manage-news-guard.service';

const routes: Routes = [
    {
        path: 'manage/news',
        component: ManageNewsComponent,
        canActivate: [ManageNewsGuard],
        children: [
            {
                path: '',
                component: NewsTableComponent
            },
            {
                path: 'page/:number',
                component: NewsTableComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ManageNewsRoutingModule {}