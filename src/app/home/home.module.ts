import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent }    from './home.component';
import { NgbModule }        from '@ng-bootstrap/ng-bootstrap';
import { SharedModule }     from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        SharedModule,
        NgbModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule { }