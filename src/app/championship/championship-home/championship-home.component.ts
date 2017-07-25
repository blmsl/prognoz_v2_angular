import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../core/auth.service';
import { ChampionshipMatch }                    from '../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPrediction }               from '../../shared/models/championship-prediction.model';
import { ChampionshipPredictionService }        from '../shared/championship-prediction.service';
import { ChampionshipRating }                   from '../../shared/models/championship-rating.model';
import { ChampionshipRatingService }            from '../shared/championship-rating.service';
import { CurrentStateService }                  from '../../core/current-state.service';
import { environment }                          from '../../../environments/environment';
import { HelperService }                        from '../../core/helper.service';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-championship-home',
  templateUrl: './championship-home.component.html',
  styleUrls: ['./championship-home.component.css']
})
export class ChampionshipHomeComponent implements OnInit, OnDestroy {

    constructor(
        private authService: AuthService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipPredictionService: ChampionshipPredictionService,
        private championshipRatingService: ChampionshipRatingService,
        private currentStateService: CurrentStateService,
        public helperService: HelperService,
        private notificationService: NotificationsService,
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    championshipMatches: ChampionshipMatch[];
    championshipPredictions: ChampionshipPrediction[];
    championshipPredictionsForm: FormGroup;
    championshipRatingItems: ChampionshipRating[];
    clubsImagesUrl: string = environment.apiImageClubs;
    errorChampionshipMatches: string | Array<string>;
    errorChampionshipPredictions: string;
    errorRating: string;
    spinnerButton: boolean = false;
    spinnerChampionshipMatches: boolean = false;
    spinnerChampionshipPredictions: boolean = false;
    spinnerRating: boolean = false;
    userImageDefault: string = environment.imageUserDefault;
    userImagesUrl: string = environment.apiImageUsers;
    userSubscription: Subscription;

    getChampionshipMatchesData() {
        this.spinnerChampionshipMatches = true;
        let param = [
            {parameter: 'filter', value: 'predictable'},
            {parameter: 'coming', value: 'true'}
        ];
        if (this.authenticatedUser) {
            this.championshipMatchService.getChampionshipPredictableMatches(param)
                .subscribe(
                    response => {
                        if (response) {
                            this.updateForm(response.championship_matches, true);
                        }
                        this.spinnerChampionshipMatches = false;
                    },
                    error => {
                        this.errorChampionshipMatches = error;
                        this.spinnerChampionshipMatches = false;
                    }
                );
        } else {
            this.championshipMatchService.getChampionshipMatches(param)
                .subscribe(
                    response => {
                        if (response) {
                            this.updateForm(response.championship_matches, false);
                        }
                        this.spinnerChampionshipMatches = false;
                    },
                    error => {
                        this.errorChampionshipMatches = error;
                        this.spinnerChampionshipMatches = false;
                    }
                );
        }
    }

    getChampionshipPredictionsData() {
        this.spinnerChampionshipPredictions = true;
        let param = [{parameter: 'distinct', value: 'true'}];
        this.championshipPredictionService.getChampionshipPredictions(param).subscribe(
            response => {
                if (response) {
                    this.championshipPredictions = response.championship_predicts;
                }
                this.spinnerChampionshipPredictions = false;
            },
            error => {
                this.errorChampionshipPredictions = error;
                this.spinnerChampionshipPredictions = false;
            }
        );
    }

    getChampionshipRatingData() {
        this.resetRatingData();
        this.spinnerRating = true;
        let param = [{parameter: 'limit', value: '5'}];
        this.championshipRatingService.getChampionshipRatingItems(param).subscribe(
            response => {
                if (response) {
                    this.championshipRatingItems = response.championship_ratings;
                }
                this.spinnerRating = false;
            },
            error => {
                this.errorRating = error;
                this.spinnerRating = false;
            }
        );
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.getChampionshipMatchesData();
        });
        this.championshipPredictionsForm = new FormGroup({});
        this.getChampionshipMatchesData();
        this.getChampionshipRatingData();
        this.getChampionshipPredictionsData();
    }

    onSubmit() {
        this.spinnerButton = true;
        let championshipPredictionsToUpdate = this.helperService.createChampionshipPredictionsArray(this.championshipPredictionsForm);
        this.championshipPredictionService.updateChampionshipPredictions(championshipPredictionsToUpdate)
            .subscribe(
                response => {
                    this.spinnerButton = false;
                    this.notificationService.success('Успішно', 'Прогнози прийнято');
                    this.getChampionshipMatchesData();
                    this.getChampionshipPredictionsData();
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    private resetRatingData() {
        this.championshipRatingItems = null;
        this.errorRating = null;
    }

    private updateForm(matches: ChampionshipMatch[], isAuthenticatedUser: boolean) {
        this.championshipMatches = matches;
        if (isAuthenticatedUser) {
            this.championshipPredictionsForm = new FormGroup({});
            for (let match of this.championshipMatches) {
                let home = match.championship_predicts.length ? match.championship_predicts[0].home : null;
                let away = match.championship_predicts.length ? match.championship_predicts[0].away : null;
                this.championshipPredictionsForm.addControl(match.id + '_home', new FormControl(home));
                this.championshipPredictionsForm.addControl(match.id + '_away', new FormControl(away));
            }
        } else {
            for (let match of this.championshipMatches) {
                this.championshipPredictionsForm.removeControl(match.id + '_home');
                this.championshipPredictionsForm.removeControl(match.id + '_away');
            }
        }
    }
}
