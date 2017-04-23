import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute, Params }               from '@angular/router';

import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { ChampionshipPredict }                  from '../../shared/models/championship-predict.model';
import { HelperService }                        from '../../shared/helper.service';
import { UserService }                          from '../../shared/user.service';
import { environment }                          from '../../../environments/environment';

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
    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    awardsImagesUrl: string = environment.API_IMAGE_AWARDS;
    
    ngOnInit() {
        this.spinner = true;
        this.activatedRoute.params.forEach((params: Params) => {
            console.log(this.activatedRoute.params);
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
