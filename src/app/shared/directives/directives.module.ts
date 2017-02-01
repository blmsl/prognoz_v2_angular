import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { AppRoutingModule }         from '../../app-routing.module';

import { SpinnerComponent }         from './spinner/spinner.component';
import { SpinnerButtonComponent }   from './spinner-button/spinner-button.component';
import { PaginationComponent }      from './pagination/pagination.component';
import { LastUserComponent }        from './last-user/last-user.component';
import { ErrorComponent }           from './error/error.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [
        SpinnerComponent,
        SpinnerButtonComponent,
        PaginationComponent,
        LastUserComponent,
        ErrorComponent
    ],
    exports: [
        SpinnerComponent,
        SpinnerButtonComponent,
        PaginationComponent,
        LastUserComponent,
        ErrorComponent
    ]
})
export class DirectivesModule { }