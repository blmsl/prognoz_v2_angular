import { Component, OnInit, OnDestroy }         from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { ChampionshipMatch }                    from '../../shared/models/championship-match.model';
import { User }                                 from '../../shared/models/user.model';
import { environment }                          from '../../../environments/environment';

@Component({
  selector: 'app-championship-predicts',
  templateUrl: './championship-predicts.component.html',
  styleUrls: ['./championship-predicts.component.css']
})
export class ChampionshipPredictsComponent implements OnInit, OnDestroy {

    constructor(
        private notificationService: NotificationsService,
        private authService: AuthService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipPredictService: ChampionshipPredictService,
        private currentStateService: CurrentStateService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    spinner: boolean = false;
    spinnerButton: boolean = false;
    error: string | Array<string>;
    matches: ChampionshipMatch[];
    championshipPredictsForm: FormGroup;
    clubsImagesUrl: string = environment.API_IMAGE_CLUBS;
    userSubscription: Subscription;

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.getMatches();
        });
        this.spinner = true;
        this.championshipPredictsForm = new FormGroup({});
        this.getMatches();
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

        this.championshipPredictService.update(predicts)
            .subscribe(
                response => {
                    this.spinnerButton = false;
                    this.notificationService.success('Успішно', 'Прогнози прийнято');
                    this.getMatches();
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    private getMatches() {
        this.spinner = true;
        this.championshipMatchService.getCurrentCompetitionMatches('predictable', null, this.authenticatedUser)
            .subscribe(
                response => {
                    this.updateForm(response);
                    this.spinner = false;
                },
                error => {
                    this.error = error;
                    this.spinner = false;
                }
            );
    }

    private updateForm(matches: ChampionshipMatch[]) {
        this.matches = matches;
        if (this.authenticatedUser) {
            this.championshipPredictsForm = new FormGroup({});
            for (let match of this.matches) {
                let home = match.championship_predicts[0] ? match.championship_predicts[0].home : null;
                let away = match.championship_predicts[0] ? match.championship_predicts[0].away : null;
                this.championshipPredictsForm.addControl(match.id + '_home', new FormControl(home));
                this.championshipPredictsForm.addControl(match.id + '_away', new FormControl(away));
            }
        } else {
            for (let match of this.matches) {
                this.championshipPredictsForm.removeControl(match.id + '_home');
                this.championshipPredictsForm.removeControl(match.id + '_away');
            }
        }
    }
}
