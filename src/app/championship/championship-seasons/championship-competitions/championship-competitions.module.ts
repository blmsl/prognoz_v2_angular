import { NgModule }                                 from '@angular/core';
import { CommonModule }                             from '@angular/common';

import { DirectivesModule }                         from '../../../shared/directives/directives.module';
import { ChampionshipCompetitionsRoutingModule }    from './championship-competitions-routing.module';
import { ChampionshipCompetitionsComponent }        from './championship-competitions.component';
import { ChampionshipCompetitionUserComponent }     from './championship-competition-user/championship-competition-user.component';
import { ChampionshipCompetitionRatingComponent }   from './championship-competition-rating/championship-competition-rating.component';
import { ChampionshipCompetitionResultsComponent }  from './championship-competition-results/championship-competition-results.component';
import { ChampionshipCompetitionWinnersComponent }  from './championship-competition-winners/championship-competition-winners.component';

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
