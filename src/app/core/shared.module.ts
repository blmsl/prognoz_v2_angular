import { CommonModule }                               from '@angular/common';
import { NgModule }                                   from '@angular/core';
import { ReactiveFormsModule }                        from '@angular/forms';

import { AppRoutingModule }                           from '../app-routing.module';
import { ChartsModule }                               from 'ng2-charts/ng2-charts';
import { ChampionshipLastResultsComponent }           from '../shared/championship/championship-last-results/championship-last-results.component';
import { ChampionshipMatchPredictableComponent }      from '../shared/championship/championship-match-predictable/championship-match-predictable.component';
import { ChampionshipMatchPredictionsTableComponent } from '../shared/championship/championship-match-predictions-table/championship-match-predictions-table.component';
import { ChampionshipNavigationComponent }            from '../shared/championship/championship-navigation/championship-navigation.component';
import { ChampionshipRatingTableComponent }           from '../shared/championship/championship-rating-table/championship-rating-table.component';
import { ChampionshipRatingTopComponent }             from '../shared/championship/championship-rating-top/championship-rating-top.component';
import { ChampionshipResultsTableComponent }          from '../shared/championship/championship-results-table/championship-results-table.component';
import { ChampionshipUserPredictionsTableComponent }  from '../shared/championship/championship-user-predictions-table/championship-user-predictions-table.component';
import { ErrorComponent }                             from '../shared/error/error.component';
import { InfoComponent }                              from '../shared/info/info.component';
import { LastUserComponent }                          from '../shared/last-user/last-user.component';
import { SpinnerButtonComponent }                     from '../shared/spinner-button/spinner-button.component';
import { SpinnerComponent }                           from '../shared/spinner/spinner.component';
import { PaginationComponent }                        from '../shared/pagination/pagination.component';
import { TinyEditorComponent }                        from '../shared/tiny-editor/tiny-editor.component';

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
        ChampionshipMatchPredictableComponent,
        TinyEditorComponent
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
        ChampionshipMatchPredictableComponent,
        TinyEditorComponent
    ]
})
export class SharedModule { }