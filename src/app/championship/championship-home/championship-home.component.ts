import { Component, OnInit, OnDestroy }         from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { ChampionshipRatingService }            from '../shared/championship-rating.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { HelperService }                        from '../../shared/helper.service';
import { ChampionshipMatch }                    from '../../shared/models/championship-match.model';
import { ChampionshipPredict }                  from '../../shared/models/championship-predict.model';
import { ChampionshipRating }                   from '../../shared/models/championship-rating.model';
import { User }                                 from '../../shared/models/user.model';
import { environment }                          from '../../../environments/environment';

@Component({
  selector: 'app-championship-home',
  templateUrl: './championship-home.component.html',
  styleUrls: ['./championship-home.component.css']
})
export class ChampionshipHomeComponent implements OnInit, OnDestroy {

    constructor(
        private notificationService: NotificationsService,
        private currentStateService: CurrentStateService,
        private authService: AuthService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipPredictService: ChampionshipPredictService,
        private championshipRatingService: ChampionshipRatingService,
        public helperService: HelperService,
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;
    clubsImagesUrl: string = environment.API_IMAGE_CLUBS;
    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;

    /* predictions form / matches */
    spinnerMatches: boolean = false;
    spinnerButton: boolean = false;
    error: string | Array<string>;
    matches: ChampionshipMatch[];
    championshipPredictsTodayForm: FormGroup;
    matchesToday: boolean = true;
    matchesTomorrow: boolean = true;

    /* last predictions */
    spinnerPredictions: boolean = false;
    errorPredictions: string | Array<string>;
    predictions: ChampionshipPredict[];

    /* rating */
    spinnerRating: boolean = false;
    errorRating: string | Array<string>;
    rating: ChampionshipRating[];

    /* date */
    date: string;

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.getMatches(this.date);
        });
        this.championshipPredictsTodayForm = new FormGroup({});
        this.getMatches('today');
        this.getTopRating();
        this.getLastPredictions();
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    onSubmit(date: string = 'today') {
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
        
        this.championshipPredictService.update(predicts)
            .subscribe(
                response => {
                    // this.updateForm(response);
                    this.spinnerButton = false;
                    this.notificationService.success('Успішно', 'Прогнози прийнято');
                    this.getMatches(date);
                    this.getLastPredictions();
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    public getMatches(date: string = 'today') {
        this.spinnerMatches = true;
        this.date = date;
        this.championshipMatchService.getPredictableMatchesByDate(date, this.authenticatedUser)
            .subscribe(
                response => {
                    if ((date === 'today') && !response.length) {
                        this.matchesToday = false;
                        this.getMatches('tomorrow');
                    } else if  ((date === 'tomorrow') && !response.length) {
                        this.matchesTomorrow = false;
                    } else {
                        this.updateForm(response);
                    }
                    this.spinnerMatches = false;
                },
                error => {
                    this.error = error;
                    this.spinnerMatches = false;
                }
            );
    }

    private updateForm(matches: ChampionshipMatch[]) {
        this.matches = matches;
        if (this.authenticatedUser) {
            this.championshipPredictsTodayForm = new FormGroup({});
            for (let match of this.matches) {
                let home = match.championship_predicts[0] ? match.championship_predicts[0].home : null;
                let away = match.championship_predicts[0] ? match.championship_predicts[0].away : null;
                this.championshipPredictsTodayForm.addControl(match.id + '_home', new FormControl(home));
                this.championshipPredictsTodayForm.addControl(match.id + '_away', new FormControl(away));
            }
        } else {
            for (let match of this.matches) {
                this.championshipPredictsTodayForm.removeControl(match.id + '_home');
                this.championshipPredictsTodayForm.removeControl(match.id + '_away');
            }
        }
    }

    public getLastPredictions() {
        this.spinnerPredictions = true;
        this.championshipPredictService.get().subscribe(
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

    public getTopRating() {
        this.spinnerRating = true;
        let param = [{parameter: 'limit', value: '5'}];
        this.championshipRatingService.get(param).subscribe(
            response => {
                this.rating = response;
                this.spinnerRating = false;
            },
            error => {
                this.errorRating = error;
                this.spinnerRating = false;
            }
        );
    }
}
