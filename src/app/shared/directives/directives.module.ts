import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { AppRoutingModule }         from '../../app-routing.module';

import { SpinnerComponent }         from './spinner/spinner.component';
import { SpinnerButtonComponent }   from './spinner-button/spinner-button.component';
import { PaginationComponent }      from './pagination/pagination.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [
        SpinnerComponent,
        SpinnerButtonComponent,
        PaginationComponent
    ],
    exports: [
        SpinnerComponent,
        SpinnerButtonComponent,
        PaginationComponent
    ]
})
export class DirectivesModule { }