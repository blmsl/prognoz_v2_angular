import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { ChampionshipMatch }                    from '../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredict }                  from '../../shared/models/championship-predict.model';
import { ChampionshipPredictionService }        from '../shared/championship-prediction.service';
import { ChampionshipRating }                   from '../../shared/models/championship-rating.model';
import { ChampionshipRatingService }            from '../shared/championship-rating.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { environment }                          from '../../../environments/environment';
import { HelperService }                        from '../../shared/helper.service';
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
    userSubscription: Subscription;

    clubsImagesUrl: string = environment.apiImageClubs;
    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;

    championshipMatches: ChampionshipMatch[];
    spinnerChampionshipMatches: boolean = false;
    errorChampionshipMatches: string | Array<string>;

    spinnerButton: boolean = false;
    championshipPredictsTodayForm: FormGroup;

    spinnerPredictions: boolean = false;
    errorPredictions: string | Array<string>;
    predictions: ChampionshipPredict[];

    championshipRatingItems: ChampionshipRating[];
    spinnerRating: boolean = false;
    errorRating: string;

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.getChampionshipMatchesData();
        });
        this.championshipPredictsTodayForm = new FormGroup({});
        this.getChampionshipMatchesData();
        this.getChampionshipRating();
        this.getLastPredictions();
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    onSubmit() {
        this.spinnerButton = true;
        let predicts = [];
        for (let predict in this.championshipPredictsTodayForm.value) {
            let id = parseInt(predict.split('_')[0]);
            // if there is no predicts on match
            if ((this.championshipPredictsTodayForm.value[id + '_home'] === null) && (this.championshipPredictsTodayForm.value[id + '_away'] === null)) {
                continue;
            }
            let currentMatch = predicts.find(myObj => myObj.params.match_id === id);
            if (!currentMatch) {
                // if there is predict only on home team
                if ((this.championshipPredictsTodayForm.value[id + '_home'] !== null) && (this.championshipPredictsTodayForm.value[id + '_away'] === null)) {
                    predicts.push({params: {match_id: id}, values: {home: this.championshipPredictsTodayForm.value[id + '_home'], away: 0}});
                    continue;
                }
                // if there is predict only on away team
                if ((this.championshipPredictsTodayForm.value[id + '_home'] === null) && (this.championshipPredictsTodayForm.value[id + '_away'] !== null)) {
                    predicts.push({params: {match_id: id}, values: {home: 0, away: this.championshipPredictsTodayForm.value[id + '_away']}});
                    continue;
                }
                // if there is predicts on two teams
                predicts.push({
                    params: {
                        match_id: id,
                    },
                    values: {
                        home: this.championshipPredictsTodayForm.value[id + '_home'],
                        away: this.championshipPredictsTodayForm.value[id + '_away']
                    }
                });
            }
        }
        
        this.championshipPredictionService.update(predicts)
            .subscribe(
                response => {
                    this.spinnerButton = false;
                    this.notificationService.success('Успішно', 'Прогнози прийнято');
                    this.getChampionshipMatchesData();
                    this.getLastPredictions();
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    public getChampionshipMatchesData() {
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

    private updateForm(matches: ChampionshipMatch[], isAuthenticatedUser: boolean) {
        this.championshipMatches = matches;
        if (isAuthenticatedUser) {
            this.championshipPredictsTodayForm = new FormGroup({});
            for (let match of this.championshipMatches) {
                let home = match.championship_predicts.length ? match.championship_predicts[0].home : null;
                let away = match.championship_predicts.length ? match.championship_predicts[0].away : null;
                this.championshipPredictsTodayForm.addControl(match.id + '_home', new FormControl(home));
                this.championshipPredictsTodayForm.addControl(match.id + '_away', new FormControl(away));
            }
        } else {
            for (let match of this.championshipMatches) {
                this.championshipPredictsTodayForm.removeControl(match.id + '_home');
                this.championshipPredictsTodayForm.removeControl(match.id + '_away');
            }
        }
    }

    public getLastPredictions() {
        this.spinnerPredictions = true;
        this.championshipPredictionService.get().subscribe(
            response => {
                this.predictions = response;
                this.spinnerPredictions = false;
            },
            error => {
                this.errorPredictions = error;
                this.spinnerPredictions = false;
            }
        );
    }

    public getChampionshipRating() {
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

    private resetRatingData() {
        this.championshipRatingItems = null;
        this.errorRating = null;
    }
}
