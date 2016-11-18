import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';

import { ManageComponent }      from './manage.component';
import { ManageNewsModule }     from './manage-news/manage-news.module';
import { ManageService }        from './shared/manage.service';
import { ManageGuard }          from './shared/manage-guard.service';
import { ManageRoutingModule }  from './manage-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ManageNewsModule,
        ManageRoutingModule
    ],
    declarations: [
        ManageComponent
    ],
    providers: [
        ManageGuard,
        ManageService
    ],
    exports: [
        ManageComponent
    ]
})
export class ManageModule { }
