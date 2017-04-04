import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent }    from './home.component';
import { DirectivesModule } from '../shared/directives/directives.module';

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