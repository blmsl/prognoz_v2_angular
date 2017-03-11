import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AccessDeniedComponent }    from './access-denied/access-denied.component';
import { GuestbookComponent }       from './guestbook/guestbook.component';
import { HomeComponent }            from './home/home.component';
import { MeComponent }              from './me/me.component';
import { MeGuard }                  from './me/me-guard.service';

const routes: Routes = [
    { path: 'guestbook/page/:number', component: GuestbookComponent },
    { path: 'guestbook', component: GuestbookComponent },
    { path: '403', component: AccessDeniedComponent },
    { path: 'user', redirectTo: '/me', pathMatch: 'full'},
    { path: 'me', component: MeComponent , canActivate: [MeGuard]},
    { path: '', component: HomeComponent }
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ]
})

export class AppRoutingModule {}