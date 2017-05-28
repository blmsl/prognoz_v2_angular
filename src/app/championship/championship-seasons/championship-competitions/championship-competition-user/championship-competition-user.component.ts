import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';

import { ChampionshipPredictService } from '../../../shared/championship-predict.service';
import { ChampionshipPredict }        from '../../../../shared/models/championship-predict.model';
import { HelperService }              from '../../../../shared/helper.service';
import { UserService }                from '../../../../shared/user.service';
import { environment }                from '../../../../../environments/environment';

@Component({
  selector: 'app-championship-competition-user',
  templateUrl: './championship-competition-user.component.html',
  styleUrls: ['./championship-competition-user.component.css']
})
export class ChampionshipCompetitionUserComponent implements OnInit {

    constructor(
        private championshipPredictService: ChampionshipPredictService,
        private activatedRoute: ActivatedRoute,
        public helperService: HelperService,
        private userService: UserService
    ) { }

    predictions: ChampionshipPredict[];
    spinnerPredictions: boolean = false;
    errorPredictions: string | Array<string>;

    user: any;
    spinnerUser: boolean = false;
    errorUser: string | Array<string>;

    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    awardsImagesUrl: string = environment.API_IMAGE_AWARDS;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.spinnerPredictions = true;
            this.spinnerUser = true;
            let userId = +params['userId'];
            let competitionId = +params['competitionId'];
            this.getUser(userId, competitionId);
            this.championshipPredictService.user(userId, competitionId).subscribe(
                response => {
                    this.predictions = response;
                    this.spinnerPredictions = false;
                },
                error => {
                    this.spinnerPredictions = false;
                    this.errorPredictions = error;
                }
            );
        });
    }

    private getUser(id: number, competitionId: number) {
        this.spinnerUser = true;
        this.userService.getUser(id, competitionId).subscribe(
            response => {
                this.user = response;
                this.spinnerUser = false;
            },
            error => {
                this.errorUser = error;
                this.spinnerUser = false;
            }
        );
    }
}
