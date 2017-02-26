import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute, Params }               from '@angular/router';

import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { ChampionshipPredict }                  from '../shared/championship-predict.model';
import { HelperService }                        from '../../shared/helper.service';
import { UserService }                          from '../../shared/user.service';
import { API_IMAGE_USERS, IMAGE_USER_DEFAULT }  from '../../shared/app.settings';
import { API_IMAGE_AWARDS }                     from '../../shared/app.settings';

@Component({
  selector: 'app-championship-user',
  templateUrl: './championship-user.component.html',
  styleUrls: ['./championship-user.component.css']
})
export class ChampionshipUserComponent implements OnInit {

    constructor(
        private championshipPredictService: ChampionshipPredictService,
        private activatedRoute: ActivatedRoute,
        public helperService: HelperService,
        private userService: UserService
    ) { }

    spinner: boolean = false;
    predicts: ChampionshipPredict[];
    error: string;
    
    spinnerUser: boolean = false;
    errorUser: string;
    user: any;
    userImagesUrl: string = API_IMAGE_USERS;
    userImageDefault: string = IMAGE_USER_DEFAULT;
    awardsImagesUrl: string = API_IMAGE_AWARDS;
    
    ngOnInit() {
        this.spinner = true;
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.getUser(id);
            this.championshipPredictService.user(id).subscribe(
                response => {
                    this.predicts = response;
                    this.spinner = false;
                },
                error => {
                    this.spinner = false;
                    this.error = error;
                }
            );
        });
    }
    
    private getUser(id: number) {
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
