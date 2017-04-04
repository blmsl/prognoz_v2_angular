import { NgModule }                                   from '@angular/core';
import { CommonModule }                               from '@angular/common';
import { AppRoutingModule }                           from '../../app-routing.module';
import { ReactiveFormsModule }                        from '@angular/forms';
import { ChartsModule }                               from 'ng2-charts/ng2-charts';

import { SpinnerComponent }                           from './spinner/spinner.component';
import { SpinnerButtonComponent }                     from './spinner-button/spinner-button.component';
import { PaginationComponent }                        from './pagination/pagination.component';
import { LastUserComponent }                          from './last-user/last-user.component';
import { ErrorComponent }                             from './error/error.component';
import { InfoComponent }                              from './info/info.component';
import { ChampionshipRatingTopComponent }             from './championship/championship-rating-top/championship-rating-top.component';
import { ChampionshipLastResultsComponent }           from './championship/championship-last-results/championship-last-results.component';
import { ChampionshipRatingTableComponent }           from './championship/championship-rating-table/championship-rating-table.component';
import { ChampionshipNavigationComponent }            from './championship/championship-navigation/championship-navigation.component';
import { ChampionshipResultsTableComponent }          from './championship/championship-results-table/championship-results-table.component';
import { ChampionshipMatchPredictionsTableComponent } from './championship/championship-match-predictions-table/championship-match-predictions-table.component';
import { ChampionshipUserPredictionsTableComponent }  from './championship/championship-user-predictions-table/championship-user-predictions-table.component';
import { ChampionshipMatchPredictableComponent }      from './championship/championship-match-predictable/championship-match-predictable.component';

@NgModule({
    imports: [
        CommonModule,
        AppRoutingModule,
        ChartsModule,
        ReactiveFormsModule
    ],
    declarations: [
        SpinnerComponent,
        SpinnerButtonComponent,
        PaginationComponent,
        LastUserComponent,
        ErrorComponent,
        InfoComponent,
        ChampionshipRatingTopComponent,
        ChampionshipLastResultsComponent,
        ChampionshipRatingTableComponent,
        ChampionshipNavigationComponent,
        ChampionshipResultsTableComponent,
        ChampionshipMatchPredictionsTableComponent,
        ChampionshipUserPredictionsTableComponent,
        ChampionshipMatchPredictableComponent
    ],
    exports: [
        SpinnerComponent,
        SpinnerButtonComponent,
        PaginationComponent,
        LastUserComponent,
        ErrorComponent,
        InfoComponent,
        ChampionshipRatingTopComponent,
        ChampionshipLastResultsComponent,
        ChampionshipRatingTableComponent,
        ChampionshipNavigationComponent,
        ChampionshipResultsTableComponent,
        ChampionshipMatchPredictionsTableComponent,
        ChampionshipUserPredictionsTableComponent,
        ChampionshipMatchPredictableComponent
    ]
})
export class DirectivesModule { }