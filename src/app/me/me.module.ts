import { CommonModule }         from '@angular/common';
import { NgModule }             from '@angular/core';
import { ReactiveFormsModule }  from '@angular/forms';

import { AppRoutingModule }     from '../app-routing.module';
import { MeComponent }          from './me.component';
import { MeGuard }              from './me-guard.service';
import { SharedModule }         from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        SharedModule
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
