import { CommonModule }     from '@angular/common';
import { NgModule }         from '@angular/core';

import { AppRoutingModule } from '../app-routing.module';
import { DirectivesModule } from '../shared/directives/directives.module';
import { HomeComponent }    from './home.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        DirectivesModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule { }