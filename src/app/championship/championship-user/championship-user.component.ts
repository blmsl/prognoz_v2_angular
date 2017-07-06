import { Component, OnInit }                    from '@angular/core';
import { ActivatedRoute, Params }               from '@angular/router';

import { ChampionshipPredict }                  from '../../shared/models/championship-predict.model';
import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { environment }                          from '../../../environments/environment';
import { HelperService }                        from '../../shared/helper.service';
import { UserService }                          from '../../shared/user.service';

@Component({
  selector: 'app-championship-user',
  templateUrl: './championship-user.component.html',
  styleUrls: ['./championship-user.component.css']
})
export class ChampionshipUserComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private championshipPredictService: ChampionshipPredictService,
        public helperService: HelperService,
        private userService: UserService
    ) { }

    spinner: boolean = false;
    predicts: ChampionshipPredict[];
    error: string;
    
    spinnerUser: boolean = false;
    errorUser: string;
    user: any;
    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
    awardsImagesUrl: string = environment.apiImageAwards;
    
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
