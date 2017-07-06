import { CommonModule }              from '@angular/common';
import { NgModule }                  from '@angular/core';
import { ReactiveFormsModule }       from '@angular/forms';

import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { DirectivesModule }          from '../../shared/directives/directives.module';
import { ManageNewsComponent }       from './manage-news.component';
import { ManageNewsGuard }           from './shared/manage-news-guard.service';
import { ManageNewsRoutingModule }   from './manage-news-routing.module';
import { NewsCreateComponent }       from './news-create/news-create.component';
import { NewsEditComponent }         from './news-edit/news-edit.component';
import { NewsTableComponent }        from './news-table/news-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageNewsRoutingModule,
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
        ManageNewsGuard
    ]
})
export class ManageNewsModule { }
