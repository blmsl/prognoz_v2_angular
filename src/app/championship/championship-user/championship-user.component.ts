import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute, Params }               from '@angular/router';

import { ChampionshipPrediction }               from '../../shared/models/championship-prediction.model';
import { ChampionshipPredictionService }        from '../shared/championship-prediction.service';
import { ChampionshipRating }                   from '../../shared/models/championship-rating.model';
import { ChampionshipRatingService }            from '../shared/championship-rating.service';
import { environment }                          from '../../../environments/environment';
import { HelperService }                        from '../../core/helper.service';
import { User }                                 from '../../shared/models/user.model';
import { UserService }                          from '../../core/user.service';

@Component({
  selector: 'app-championship-user',
  templateUrl: './championship-user.component.html',
  styleUrls: ['./championship-user.component.css']
})
export class ChampionshipUserComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private championshipPredictionService: ChampionshipPredictionService,
        private championshipRatingService: ChampionshipRatingService,
        public helperService: HelperService,
        private userService: UserService
    ) { }

    awardsImagesUrl: string = environment.apiImageAwards;
    championshipPredictions: ChampionshipPrediction[];
    championshipRatingItem: ChampionshipRating;
    errorChampionshipPredictions: string;
    errorRating: string;
    errorUser: string;
    spinnerChampionshipPredictions: boolean = false;
    spinnerRating: boolean = false;
    spinnerUser: boolean = false;
    user: User;
    userImageDefault: string = environment.imageUserDefault;
    userImagesUrl: string = environment.apiImageUsers;

    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.getUserData(params['id']);
            this.getChampionshipRatingItemData(params['id']);
            this.getChampionshipPredictionsData(params['id']);
        });
    }

    private getChampionshipPredictionsData(userId: number) {
        this.spinnerChampionshipPredictions = true;
        let param = [{parameter: 'user-id', value: userId.toString()}];
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

    private getChampionshipRatingItemData(id: number) {
        this.spinnerRating = true;
        this.championshipRatingService.getChampionshipRatingItem(id).subscribe(
            response => {
                this.championshipRatingItem = response;
                this.spinnerRating = false;
            },
            error => {
                this.errorRating = error;
                this.spinnerRating = false;
            }
        );
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
}
