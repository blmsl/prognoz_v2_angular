import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';
import { Ng2PaginationModule }  from 'ng2-pagination';

import { AppRoutingModule }     from '../app-routing.module';
import { DirectivesModule }     from '../shared/directives/directives.module';
import { GuestbookComponent }   from './guestbook.component';
import { GuestbookService }     from './guestbook.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
        Ng2PaginationModule,
        DirectivesModule
    ],
    declarations: [
        GuestbookComponent
    ],
    providers: [
        GuestbookService
    ],
    exports: [
        GuestbookComponent
    ]
})
export class GuestbookModule { }
