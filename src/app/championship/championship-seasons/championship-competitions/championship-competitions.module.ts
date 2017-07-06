import { CommonModule }                             from '@angular/common';
import { NgModule }                                 from '@angular/core';

import { ChampionshipCompetitionRatingComponent }   from './championship-competition-rating/championship-competition-rating.component';
import { ChampionshipCompetitionResultsComponent }  from './championship-competition-results/championship-competition-results.component';
import { ChampionshipCompetitionsComponent }        from './championship-competitions.component';
import { ChampionshipCompetitionsRoutingModule }    from './championship-competitions-routing.module';
import { ChampionshipCompetitionUserComponent }     from './championship-competition-user/championship-competition-user.component';
import { ChampionshipCompetitionWinnersComponent }  from './championship-competition-winners/championship-competition-winners.component';
import { DirectivesModule }                         from '../../../shared/directives/directives.module';

@NgModule({
    imports: [
        CommonModule,
        DirectivesModule,
        ChampionshipCompetitionsRoutingModule
    ],
    declarations: [
        ChampionshipCompetitionsComponent,
        ChampionshipCompetitionUserComponent,
        ChampionshipCompetitionRatingComponent,
        ChampionshipCompetitionResultsComponent,
        ChampionshipCompetitionWinnersComponent
    ],
    exports: [
        ChampionshipCompetitionsComponent
    ]
})
export class ChampionshipCompetitionsModule { }
