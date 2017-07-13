import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { ChampionshipMatch }                    from '../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredictionService }        from '../shared/championship-prediction.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { environment }                          from '../../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-championship-predictions',
  templateUrl: './championship-predictions.component.html',
  styleUrls: ['./championship-predictions.component.css']
})
export class ChampionshipPredictionsComponent implements OnInit, OnDestroy {

    constructor(
        private authService: AuthService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipPredictionService: ChampionshipPredictionService,
        private currentStateService: CurrentStateService,
        private notificationService: NotificationsService
    ) { }

    championshipMatches: ChampionshipMatch[];
    spinnerChampionshipMatches: boolean = false;
    errorChampionshipMatches: string;
    noChampionshipMatches: string = 'В базі даних матчів не знайдено.';

    spinnerButton: boolean = false;
    championshipPredictsForm: FormGroup;

    clubsImagesUrl: string = environment.apiImageClubs;
    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.getChampionshipMatchesData();
        });
        this.championshipPredictsForm = new FormGroup({});
        this.getChampionshipMatchesData();
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    onSubmit() {
        this.spinnerButton = true;
        let predicts = [];
        for (let predict in this.championshipPredictsForm.value) {
            let id = parseInt(predict.split('_')[0]);
            // if there is no predicts on match
            if ((this.championshipPredictsForm.value[id + '_home'] === null) && (this.championshipPredictsForm.value[id + '_away'] === null)) {
                continue;
            }
            let currentMatch = predicts.find(myObj => myObj.params.match_id === id);
            if (!currentMatch) {
                // if there is predict only on home team
                if ((this.championshipPredictsForm.value[id + '_home'] !== null) && (this.championshipPredictsForm.value[id + '_away'] === null)) {
                    predicts.push({params: {match_id: id}, values: {home: this.championshipPredictsForm.value[id + '_home'], away: 0}});
                    continue;
                }
                // if there is predict only on away team
                if ((this.championshipPredictsForm.value[id + '_home'] === null) && (this.championshipPredictsForm.value[id + '_away'] !== null)) {
                    predicts.push({params: {match_id: id}, values: {home: 0, away: this.championshipPredictsForm.value[id + '_away']}});
                    continue;
                }
                // if there is predicts on two teams
                predicts.push({
                    params: {
                        match_id: id,
                    },
                    values: {
                        home: this.championshipPredictsForm.value[id + '_home'],
                        away: this.championshipPredictsForm.value[id + '_away']
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
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    private getChampionshipMatchesData() {
        this.spinnerChampionshipMatches = true;
        let param = [{parameter: 'filter', value: 'predictable'}];
        if (this.authenticatedUser) {
            this.championshipMatchService.getChampionshipPredictableMatches(param).subscribe(
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
            this.championshipMatchService.getChampionshipMatches(param).subscribe(
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
            this.championshipPredictsForm = new FormGroup({});
            for (let match of this.championshipMatches) {
                let home = match.championship_predicts.length ? match.championship_predicts[0].home : null;
                let away = match.championship_predicts.length ? match.championship_predicts[0].away : null;
                this.championshipPredictsForm.addControl(match.id + '_home', new FormControl(home));
                this.championshipPredictsForm.addControl(match.id + '_away', new FormControl(away));
            }
        } else {
            for (let match of this.championshipMatches) {
                this.championshipPredictsForm.removeControl(match.id + '_home');
                this.championshipPredictsForm.removeControl(match.id + '_away');
            }
        }
    }
}
