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

    championshipMatch: ChampionshipMatch;
    spinnerChampionshipMatch: boolean = false;
    errorChampionshipMatch: string;

    statistic: any;
    errorStatistic: string;
    spinnerStatistic: boolean = false;

    clubsImagesUrl: string = environment.apiImageClubs;
    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;

    resultChartLabels: string[];
    resultChartType: string = 'doughnut';
    resultChartData: number[];

    // scoresChartLabels: string[];
    // scoresChartType: string = 'doughnut';
    // scoresChartData: number[];
  
    ngOnInit(){
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
        });
        this.activatedRoute.params.forEach((params: Params) => {
            this.resetData();
            this.getChampionshipMatchData(params['id']);
            this.getChampionshipMatchStatisticData(params['id']);
        });
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    private getChampionshipMatchData(id: number) {
        this.spinnerChampionshipMatch = true;
        this.championshipMatchService.getChampionshipMatch(id)
            .subscribe(
                response => {
                    this.championshipMatch = response.championship_match;
                    this.resultChartLabels = [response.championship_match.club_first.title, response.championship_match.club_second.title, 'Нічия'];
                    this.spinnerChampionshipMatch = false;
                },
                error => {
                    this.errorChampionshipMatch = error;
                    this.spinnerChampionshipMatch = false;
                }
            );
    }

    private getChampionshipMatchStatisticData(id: number) {
        this.spinnerStatistic = true;
        let param = [{parameter: 'statistic', value: 'true'}];
        this.championshipMatchService.getChampionshipMatch(id, param).subscribe(
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
    }

    goBack() {
        this.location.back();
    }

    private resetData(): void {
        this.championshipMatch = null;
        this.errorChampionshipMatch = null;
        this.statistic = null;
        this.errorStatistic = null;
    }
}
