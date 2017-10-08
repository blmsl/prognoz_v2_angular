import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../core/auth.service';
import { ChampionshipMatch }                    from '../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredictionService }        from '../shared/championship-prediction.service';
import { CurrentStateService }                  from '../../core/current-state.service';
import { environment }                          from '../../../environments/environment';
import { HelperService }                        from '../../core/helper.service';
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
        private helperService: HelperService,
        private notificationService: NotificationsService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    championshipMatches: ChampionshipMatch[];
    championshipPredictionsForm: FormGroup;
    clubsImagesUrl: string = environment.apiImageClubs;
    errorChampionshipMatches: string;
    spinnerButton: boolean = false;
    userSubscription: Subscription;

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(response => {
            this.authenticatedUser = response;
            this.getChampionshipMatchesData();
        });
        this.championshipPredictionsForm = new FormGroup({});
        this.getChampionshipMatchesData();
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
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    private getChampionshipMatchesData() {
        let param = [{parameter: 'filter', value: 'predictable'}];
        if (this.authenticatedUser) {
            this.championshipMatchService.getChampionshipPredictableMatches(param).subscribe(
                response => {
                    if (response) {
                        this.updateForm(response.championship_matches, true);
                    }
                },
                error => {
                    this.errorChampionshipMatches = error;
                }
            );
        } else {
            this.championshipMatchService.getChampionshipMatches(param).subscribe(
                response => {
                    if (response) {
                        this.updateForm(response.championship_matches, false);
                    }
                },
                error => {
                    this.errorChampionshipMatches = error;
                }
            );
        }
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
