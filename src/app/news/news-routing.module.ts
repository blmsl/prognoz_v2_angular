import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { NewsComponent }            from './news.component';
import { NewsDetailComponent }      from './news-detail/news-detail.component';
import { NewsListComponent }        from './news-list/news-list.component';
import { PageNotFoundComponent }    from '../page-not-found/page-not-found.component';

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
                path: 'page/:number',
                component: NewsListComponent
            },
            {
                path: ':id',
                component: NewsDetailComponent
            }
        ]
    },
    {path: '404', component: PageNotFoundComponent },
    {path: '**', redirectTo: '/404'}
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class NewsRoutingModule {}