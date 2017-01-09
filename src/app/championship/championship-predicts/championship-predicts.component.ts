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

    authenticatedUser: any;
    spinner: boolean = false;
    error: string | Array<string>;
    matches: ChampionshipMatch[];
    championshipPredictsForm: FormGroup;
    clubsImagesUrl: string = API_IMAGE_CLUBS;

    ngOnInit() {
        this.championshipPredictsForm = new FormGroup({});
        this.spinner = true;
        this.championshipMatchService.getPredictable().subscribe(
            response => {
                this.matches = response;
                for (let match of response) {
                    this.championshipPredictsForm.addControl('m' + match.id + '_t1', new FormControl(''));
                    this.championshipPredictsForm.addControl('m' + match.id + '_t2', new FormControl(''));
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
        console.log(this.championshipPredictsForm.value);
        this.championshipPredictService.update(this.championshipPredictsForm.value, this.userService.sharedUser)
            .subscribe(
                response => {

                },
                error => {

                }
            );
    }

}
