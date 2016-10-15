import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { NewsComponent }    from './news/news.component';
import { HomeComponent }    from './home/home.component';

const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'news', component: NewsComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}