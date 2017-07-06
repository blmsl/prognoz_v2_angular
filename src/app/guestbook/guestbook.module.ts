import { CommonModule }           from '@angular/common';
import { NgModule }               from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';

import { DirectivesModule }       from '../shared/directives/directives.module';
import { GuestbookComponent }     from './guestbook.component';
import { GuestbookPageComponent } from './guestbook-page/guestbook-page.component';
import { GuestbookService }       from './shared/guestbook.service';
import { GuestbookRoutingModule } from './guestbook-routing.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        GuestbookRoutingModule,
        DirectivesModule
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
