import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FormsModule }          from '@angular/forms'; //TODO: check
import { ReactiveFormsModule }  from '@angular/forms'; //TODO: check
import { Ng2PaginationModule }  from 'ng2-pagination';

import { AppRoutingModule }     from '../app-routing.module';
import { GuestbookComponent }   from './guestbook.component';
import { GuestbookService }     from './guestbook.service';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        Ng2PaginationModule
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
