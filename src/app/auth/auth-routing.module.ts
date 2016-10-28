import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { AuthComponent }        from './auth.component';
import { AuthSignupComponent }  from './auth-signup/auth-signup.component';
import { AuthSigninComponent }  from './auth-signin/auth-signin.component';

const routes: Routes = [
    {
        path: '',
        component: AuthComponent,
        children: [
            {
                path: 'signup',
                component: AuthSignupComponent
            },
            {
                path: 'signin',
                component: AuthSigninComponent
            }
        ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ]
})

export class AuthRoutingModule {}
