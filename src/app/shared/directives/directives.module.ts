import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { SpinnerComponent }         from './spinner/spinner.component';
import { SpinnerButtonComponent }   from './spinner-button/spinner-button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SpinnerComponent,
        SpinnerButtonComponent
    ],
    exports: [
        SpinnerComponent,
        SpinnerButtonComponent
    ]
})
export class DirectivesModule { }