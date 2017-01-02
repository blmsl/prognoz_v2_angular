import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';
import { Ng2PaginationModule }      from 'ng2-pagination';
import { ConfirmationPopoverModule }from 'angular-confirmation-popover';

import { DirectivesModule }         from '../../shared/directives/directives.module';
import { ManageNewsComponent }      from './manage-news.component';
import { ManageNewsRoutingModule }  from './manage-news-routing.module';
import { ManageNewsService }        from './shared/manage-news.service';
import { ManageNewsGuard }          from './shared/manage-news-guard.service';
import { NewsTableComponent }       from './news-table/news-table.component';
import { NewsCreateComponent }      from './news-create/news-create.component';
import { NewsEditComponent }        from './news-edit/news-edit.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageNewsRoutingModule,
        Ng2PaginationModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger',
            focusButton: 'confirm'
        }),
        DirectivesModule
    ],
    declarations: [
        ManageNewsComponent,
        NewsTableComponent,
        NewsCreateComponent,
        NewsEditComponent
    ],
    providers: [
        ManageNewsGuard,
        ManageNewsService
    ]
})
export class ManageNewsModule { }
