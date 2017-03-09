import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params }         from '@angular/router';
import { Location }                       from '@angular/common';

import { ChampionshipMatchService }       from '../shared/championship-match.service';
import { ChampionshipMatch }              from '../shared/championship-match.model';
import { HelperService }                  from '../../shared/helper.service';
import { UserService }                    from '../../shared/user.service';
import { environment }                    from '../../../environments/environment';

@Component({
  selector: 'app-championship-match',
  templateUrl: './championship-match.component.html',
  styleUrls: ['./championship-match.component.css']
})
export class ChampionshipMatchComponent implements OnInit {

    constructor(
        private championshipMatchService: ChampionshipMatchService,
        private activatedRoute: ActivatedRoute,
        public helperService: HelperService,
        private location: Location,
        private userService: UserService,
    ) {}

    spinner: boolean = false;
    match: ChampionshipMatch;
    error: string;
    clubsImagesUrl: string = environment.API_IMAGE_CLUBS;
    authenticatedUser: any;
    
    // statistic
    statistic: any;
    errorStatistic: string;
    spinnerStatistic: boolean = false;
    // result
    resultChartLabels: string[];
    resultChartType: string = 'doughnut';
    resultChartData: number[];
    // scores
    // scoresChartLabels: string[];
    // scoresChartType: string = 'doughnut';
    // scoresChartData: number[];
  
    ngOnInit(){
        this.authenticatedUser = this.userService.sharedUser;
        this.activatedRoute.params.forEach((params: Params) => {
            this.match = null;
            this.error = null;
            this.spinner = true;
            let id = +params['id'];
            this.championshipMatchService.getWithPredicts(id).subscribe(
                response => {
                    this.match = response;
                    this.resultChartLabels = [response.club_first.title, response.club_second.title, 'Нічия'];
                    this.spinner = false;
                },
                error => {
                    this.error = error;
                    this.spinner = false;
                }
            );
        });
        this.getStatistic();
    }

    getStatistic() {
        this.spinnerStatistic = true;
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.championshipMatchService.getStatistic(id).subscribe(
                response => {
                    this.statistic = response;
                    this.resultChartData = [response.results.home, response.results.away, response.results.draw];
                    // this.scoresChartData = (<any>Object).values(this.statistic.scores);
                    // this.scoresChartLabels = Object.keys(this.statistic.scores);
                    this.spinnerStatistic = false;
                },
                error => {
                    this.errorStatistic = error;
                    this.spinnerStatistic = false;
                }
            );
        });
    }

    goBack() {
        this.location.back();
    }
}
