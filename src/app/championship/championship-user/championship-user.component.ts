import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute, Params }               from '@angular/router';

import { ChampionshipPredict }                  from '../../shared/models/championship-predict.model';
import { ChampionshipPredictionService }        from '../shared/championship-prediction.service';
import { ChampionshipRating }                   from '../../shared/models/championship-rating.model';
import { ChampionshipRatingService }            from '../shared/championship-rating.service';
import { environment }                          from '../../../environments/environment';
import { HelperService }                        from '../../shared/helper.service';
import { User }                                 from '../../shared/models/user.model';
import { UserService }                          from '../../shared/user.service';

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

    user: User;
    spinnerUser: boolean = false;
    errorUser: string;

    championshipRatingItem: ChampionshipRating;
    spinnerRating: boolean = false;
    errorRating: string;

    spinner: boolean = false;
    predicts: ChampionshipPredict[];
    error: string;

    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
    awardsImagesUrl: string = environment.apiImageAwards;
    
    ngOnInit() {
        this.activatedRoute.params.forEach((params: Params) => {
            this.getUserData(params['id']);
            this.getChampionshipRatingItemData(params['id']);

            let id = +params['id'];
            this.getUserPredictions(id);
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

    private getUserPredictions(id) {
        this.spinner = true;
        this.championshipPredictionService.user(id).subscribe(
            response => {
                this.predicts = response;
                this.spinner = false;
            },
            error => {
                this.spinner = false;
                this.error = error;
            }
        );
    }
}
