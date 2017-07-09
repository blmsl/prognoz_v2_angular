import { Component, OnInit }          from '@angular/core';
import { ActivatedRoute, Params }     from '@angular/router';

import { ChampionshipPredict }        from '../../../../shared/models/championship-predict.model';
import { ChampionshipPredictService } from '../../../shared/championship-predict.service';
import { environment }                from '../../../../../environments/environment';
import { HelperService }              from '../../../../shared/helper.service';
import { User }                       from '../../../../shared/models/user.model';
import { UserService }                from '../../../../shared/user.service';

@Component({
  selector: 'app-championship-competition-user',
  templateUrl: './championship-competition-user.component.html',
  styleUrls: ['./championship-competition-user.component.css']
})
export class ChampionshipCompetitionUserComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private championshipPredictService: ChampionshipPredictService,
        public helperService: HelperService,
        private userService: UserService
    ) { }

    predictions: ChampionshipPredict[];
    spinnerPredictions: boolean = false;
    errorPredictions: string | Array<string>;

    user: User;
    spinnerUser: boolean = false;
    errorUser: string;

    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
    awardsImagesUrl: string = environment.apiImageAwards;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            let userId = +params['userId'];
            let competitionId = +params['competitionId'];
            this.getUserData(params['userId']);
            this.getUserPredictions(userId, competitionId);
        });
    }

    private getUserData(id: number) {
        this.spinnerUser = true;
        this.userService.getUser(id).subscribe(
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

    private getUserPredictions(userId: number, competitionId: number) {
        this.spinnerPredictions = true;
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
    }
}
