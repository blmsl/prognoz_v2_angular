import { NgModule }                          from '@angular/core';
import { CommonModule }                      from '@angular/common';

import { DirectivesModule }                  from '../../../shared/directives/directives.module';
import { ChampionshipCompetitionsComponent } from './championship-competitions.component';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
    ],
    declarations: [
        ChampionshipCompetitionsComponent
    ],
    exports: [
        ChampionshipCompetitionsComponent
    ]
})
export class ChampionshipCompetitionsModule { }
