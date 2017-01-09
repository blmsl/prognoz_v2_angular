import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { ReactiveFormsModule }           from '@angular/forms';

import { DirectivesModule }              from '../shared/directives/directives.module';
import { ChampionshipComponent }         from './championship.component';
import { ChampionshipPredictsComponent } from './championship-predicts/championship-predicts.component';

import { ChampionshipRoutingModule }     from './championship-routing.module';
import { ChampionshipMatchService }      from './shared/championship-match.service';
import { ChampionshipPredictService }    from './shared/championship-predict.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChampionshipRoutingModule,
        DirectivesModule
    ],
    declarations: [
        ChampionshipComponent, 
        ChampionshipPredictsComponent
    ],
    exports: [
        ChampionshipComponent
    ],
    providers: [
        ChampionshipMatchService,
        ChampionshipPredictService
    ]
})
export class ChampionshipModule { }
