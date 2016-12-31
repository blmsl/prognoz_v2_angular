import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AccessDeniedComponent }    from './access-denied/access-denied.component';
import { GuestbookComponent }       from './guestbook/guestbook.component';
import { HomeComponent }            from './home/home.component';

const routes: Routes = [
    { path: 'guestbook/page/:number', component: GuestbookComponent },
    { path: 'guestbook', component: GuestbookComponent },
    { path: '403', component: AccessDeniedComponent },
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}