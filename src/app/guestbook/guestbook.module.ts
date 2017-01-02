import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';

import { AppRoutingModule }     from '../app-routing.module';
import { DirectivesModule }     from '../shared/directives/directives.module';
import { GuestbookComponent }   from './guestbook.component';
import { GuestbookService }     from './guestbook.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AppRoutingModule,
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
