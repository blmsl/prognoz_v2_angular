import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { ReactiveFormsModule }           from '@angular/forms';

import { DirectivesModule }              from '../shared/directives/directives.module';
import { ChampionshipComponent }         from './championship.component';
import { ChampionshipPredictsComponent } from './championship-predicts/championship-predicts.component';
import { ChampionshipRatingComponent }   from './championship-rating/championship-rating.component';

import { ChampionshipRoutingModule }     from './championship-routing.module';
import { ChampionshipMatchService }      from './shared/championship-match.service';
import { ChampionshipPredictService }    from './shared/championship-predict.service';
import { ChampionshipRatingService }     from './shared/championship-rating.service';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ChampionshipRoutingModule,
        DirectivesModule
    ],
    declarations: [
        ChampionshipComponent, 
        ChampionshipPredictsComponent, 
        ChampionshipRatingComponent
    ],
    exports: [
        ChampionshipComponent
    ],
    providers: [
        ChampionshipMatchService,
        ChampionshipPredictService,
        ChampionshipRatingService
    ]
})
export class ChampionshipModule { }
