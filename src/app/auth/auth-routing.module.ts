import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AuthComponent }            from './auth.component';
import { AuthRecoveryComponent }    from './auth-recovery/auth-recovery.component';
import { AuthResetComponent }       from './auth-reset/auth-reset.component';
import { AuthSigninComponent }      from './auth-signin/auth-signin.component';
import { AuthSignupComponent }      from './auth-signup/auth-signup.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'recovery',
                component: AuthRecoveryComponent
            },
            {
                path: 'reset/:token',
                component: AuthResetComponent
            },
            {
                path: 'signin',
                component: AuthSigninComponent
            },
            {
                path: 'signup',
                component: AuthSignupComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class AuthRoutingModule {}
