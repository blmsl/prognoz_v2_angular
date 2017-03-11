import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';

import { AppRoutingModule }     from '../app-routing.module';
import { DirectivesModule }     from '../shared/directives/directives.module';
import { MeComponent }          from './me.component';
import { MeGuard }              from './me-guard.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        DirectivesModule
    ],
    declarations: [
        MeComponent
    ],
    providers: [
        MeGuard
    ],
    exports: [
        MeComponent
    ]
})
export class MeModule { }
