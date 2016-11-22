import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { Ng2PaginationModule }      from 'ng2-pagination';
import { ConfirmationPopoverModule }from 'angular-confirmation-popover';

import { ManageNewsComponent }      from './manage-news.component';
import { ManageNewsRoutingModule }  from './manage-news-routing.module';
import { ManageNewsService }        from './shared/manage-news.service';
import { ManageNewsGuard }          from './shared/manage-news-guard.service';
import { NewsTableComponent }       from './news-table/news-table.component';

@NgModule({
    imports: [
        CommonModule,
        ManageNewsRoutingModule,
        Ng2PaginationModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger',
            focusButton: 'confirm'
        })
    ],
    declarations: [
        ManageNewsComponent,
        NewsTableComponent
    ],
    providers: [
        ManageNewsGuard,
        ManageNewsService
    ]
})
export class ManageNewsModule { }
