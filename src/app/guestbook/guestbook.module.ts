import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';

import { GuestbookComponent }     from './guestbook.component';
import { GuestbookPageComponent } from './guestbook-page/guestbook-page.component';
import { GuestbookService }       from './shared/guestbook.service';
import { GuestbookRoutingModule } from './guestbook-routing.module';
import { SharedModule }           from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GuestbookRoutingModule,
        SharedModule
    ],
    declarations: [
        GuestbookComponent,
        GuestbookPageComponent
    ],
    providers: [
        GuestbookService
    ],
    exports: [
        GuestbookComponent
    ]
})
export class GuestbookModule { }
