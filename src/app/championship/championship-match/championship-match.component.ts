import { Location }                       from '@angular/common';
import { Component, OnDestroy, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }         from '@angular/router';
import { Subscription }                   from 'rxjs/Subscription';

import { AuthService }                    from '../../shared/auth.service';
import { ChampionshipMatch }              from '../../shared/models/championship-match.model';
import { ChampionshipMatchService }       from '../shared/championship-match.service';
import { CurrentStateService }            from '../../shared/current-state.service';
import { environment }                    from '../../../environments/environment';
import { HelperService }                  from '../../shared/helper.service';
import { User }                           from '../../shared/models/user.model';

@Component({
  selector: 'app-championship-match',
  templateUrl: './championship-match.component.html',
  styleUrls: ['./championship-match.component.css']
})
export class ChampionshipMatchComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private championshipMatchService: ChampionshipMatchService,
        private currentStateService: CurrentStateService,
        public helperService: HelperService,
        private location: Location
    ) { }

    spinner: boolean = false;
    match: ChampionshipMatch;
    error: string;
    clubsImagesUrl: string = environment.apiImageClubs;
    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;

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
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });
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

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
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
