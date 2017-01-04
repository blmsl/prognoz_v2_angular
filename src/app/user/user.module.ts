import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';

import { AppRoutingModule }     from '../app-routing.module';
import { DirectivesModule }     from '../shared/directives/directives.module';
import { UserComponent }        from './user.component';
import { UserGuard }            from './user-guard.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DirectivesModule
    ],
    declarations: [
        UserComponent
    ],
    providers: [
        UserGuard
    ],
    exports: [
        UserComponent
    ]
})
export class UserModule { }
