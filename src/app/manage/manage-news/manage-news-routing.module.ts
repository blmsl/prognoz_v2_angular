import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { ManageNewsComponent }      from './manage-news.component';
import { NewsTableComponent }       from './news-table/news-table.component';
import { NewsCreateComponent }      from './news-create/news-create.component';
import { NewsEditComponent }        from './news-edit/news-edit.component';
import { ManageNewsGuard }          from './shared/manage-news-guard.service';

const routes: Routes = [
    {
        path: 'manage/news',
        component: ManageNewsComponent,
        canActivate: [ ManageNewsGuard ],
        children: [
            {
                path: '',
                canActivateChild: [ ManageNewsGuard ],
                children: [
                    { path: 'page/:number', component: NewsTableComponent },
                    { path: 'create', component: NewsCreateComponent },
                    { path: ':id/edit', component: NewsEditComponent },
                    { path: '', component: NewsTableComponent }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class ManageNewsRoutingModule {}