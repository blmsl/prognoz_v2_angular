import { NgModule }     from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { HomeComponent }    from './home.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule
    ],
    declarations: [HomeComponent],
    exports: [HomeComponent]
})
export class HomeModule { }