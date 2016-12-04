import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { GuestbookComponent }       from './guestbook/guestbook.component';
import { HomeComponent }            from './home/home.component';

const routes: Routes = [
    { path: 'guestbook/page/:number', component: GuestbookComponent },
    { path: 'guestbook', component: GuestbookComponent },
    { path: '', component: HomeComponent }
    // TODO: page 404 { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}