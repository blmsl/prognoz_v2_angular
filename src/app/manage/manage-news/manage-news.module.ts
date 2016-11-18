import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { ManageNewsComponent }      from './manage-news.component';
import { ManageNewsRoutingModule }  from './manage-news-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ManageNewsRoutingModule
    ],
    declarations: [
        ManageNewsComponent
    ]
})
export class ManageNewsModule { }
