import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { ChampionshipMatch }                    from '../../manage/manage-championship/shared/championship-match.model';
import { UserService }                          from '../../shared/user.service';
import { API_IMAGE_CLUBS }                      from '../../shared/app.settings';

@Component({
  selector: 'app-championship-predicts',
  templateUrl: './championship-predicts.component.html',
  styleUrls: ['./championship-predicts.component.css']
})
export class ChampionshipPredictsComponent implements OnInit {

    constructor(
        private notificationService: NotificationsService,
        private userService: UserService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipPredictService: ChampionshipPredictService
    ) { }

    authenticatedUser: any = this.userService.sharedUser;
    spinner: boolean = false;
    error: string | Array<string>;
    matches: ChampionshipMatch[];
    championshipPredictsForm: FormGroup;
    clubsImagesUrl: string = API_IMAGE_CLUBS;

    ngOnInit() {
        this.spinner = true;
        this.championshipMatchService.getPredictable().subscribe(
            response => {
                this.matches = response;
                if (this.authenticatedUser) {
                    this.championshipPredictsForm = new FormGroup({});
                    for (let match of this.matches) {
                        let home = match.championship_predicts[0] ? match.championship_predicts[0].home : null;
                        let away = match.championship_predicts[0] ? match.championship_predicts[0].away : null;
                        this.championshipPredictsForm.addControl(match.id + '_home', new FormControl(home));
                        this.championshipPredictsForm.addControl(match.id + '_away', new FormControl(away));
                    }
                }
                this.spinner = false;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }

    onSubmit() {
        let predicts = {};
        for (let predict in this.championshipPredictsForm.value) {
            let id = predict.split('_')[0];
            // if there is no predicts on match
            if ((this.championshipPredictsForm.value[id + '_home'] === null) && (this.championshipPredictsForm.value[id + '_away'] === null)) {
                continue;
            }
            // if there is predict only on home team
            if ((this.championshipPredictsForm.value[id + '_home'] !== null) && (this.championshipPredictsForm.value[id + '_away'] === null)) {
                predicts[id + '_home'] = this.championshipPredictsForm.value[id + '_home'];
                predicts[id + '_away'] = 0;
                continue;
            }
            // if there is predict only on away team
            if ((this.championshipPredictsForm.value[id + '_home'] === null) && (this.championshipPredictsForm.value[id + '_away'] !== null)) {
                predicts[id + '_home'] = 0;
                predicts[id + '_away'] = this.championshipPredictsForm.value[id + '_away'];
                continue;
            }
            // if there is predicts on two teams
            predicts[predict] = this.championshipPredictsForm.value[predict];
        }

        //TODO: send predict request; update or create values; return new matches array;
        this.championshipPredictService.update(this.championshipPredictsForm.value, this.userService.sharedUser)
            .subscribe(
                response => {

                },
                error => {

                }
            );
    }
}
