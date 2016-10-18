import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { NewsComponent }        from './news.component';
import { NewsCreateComponent }  from './news-create/news-create.component';
import { NewsDetailComponent }  from './news-detail/news-detail.component';
import { NewsListComponent }    from './news-list/news-list.component';

const routes: Routes = [
    {
        path: 'news',
        component: NewsComponent,
        children: [
            {
                path: '',
                component: NewsListComponent
            },
            {
                path: 'create',
                component: NewsCreateComponent
            },
            {
                path: ':id',
                component: NewsDetailComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class NewsRoutingModule {}