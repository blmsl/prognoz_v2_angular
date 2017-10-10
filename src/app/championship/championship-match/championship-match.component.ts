import { Location }                       from '@angular/common';
import { Component, OnDestroy, OnInit }   from '@angular/core';
import { ActivatedRoute, Params }         from '@angular/router';
import { Subscription }                   from 'rxjs/Subscription';

import { AuthService }                    from '../../core/auth.service';
import { ChampionshipMatch }              from '../../shared/models/championship-match.model';
import { ChampionshipMatchService }       from '../shared/championship-match.service';
import { CurrentStateService }            from '../../core/current-state.service';
import { environment }                    from '../../../environments/environment';
import { HelperService }                  from '../../core/helper.service';
import { TitleService }                   from '../../core/title.service';
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
        private location: Location,
        private titleService: TitleService
    ) { }

    authenticatedUser: User = this.currentStateService.user;
    championshipMatch: ChampionshipMatch;
    clubsImagesUrl: string = environment.apiImageClubs;
    errorChampionshipMatch: string;
    errorStatistic: string;
    resultChartData: number[];
    resultChartLabels: string[];
    resultChartType: string = 'doughnut';
    // scoresChartData: number[];
    // scoresChartLabels: string[];
    // scoresChartType: string = 'doughnut';
    statistic: any;
    userSubscription: Subscription;

    getChampionshipMatchStatisticData(id: number) {
        let param = [{parameter: 'statistic', value: 'true'}];
        this.championshipMatchService.getChampionshipMatch(id, param).subscribe(
            response => {
                this.resetStatisticData();
                this.statistic = response;
                this.resultChartData = [response.results.home, response.results.away, response.results.draw];
                // this.scoresChartData = (<any>Object).values(this.statistic.scores);
                // this.scoresChartLabels = Object.keys(this.statistic.scores);
            },
            error => {
                this.resetStatisticData();
                this.errorStatistic = error;
            }
        );
    }

    goBack() {
        this.location.back();
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(response => {
            this.authenticatedUser = response;
        });
        this.activatedRoute.params.forEach((params: Params) => {
            this.getChampionshipMatchData(params['id']);
            this.getChampionshipMatchStatisticData(params['id']);
        });
    }

    private getChampionshipMatchData(id: number) {
        this.championshipMatchService.getChampionshipMatch(id)
            .subscribe(
                response => {
                    this.resetChampionshipMatchData();
                    this.titleService.setTitle(`${response.championship_match.club_first.title} vs
                        ${response.championship_match.club_second.title}
                        ${response.championship_match.starts_at.slice(0, -3)} - Чемпіонат`);
                    this.championshipMatch = response.championship_match;
                    this.resultChartLabels = [
                        response.championship_match.club_first.title,
                        response.championship_match.club_second.title,
                        'Нічия'
                    ];
                },
                error => {
                    this.resetChampionshipMatchData();
                    this.errorChampionshipMatch = error;
                }
            );
    }

    private resetChampionshipMatchData(): void {
        this.championshipMatch = null;
        this.errorChampionshipMatch = null;
    }

    private resetStatisticData(): void {
        this.statistic = null;
        this.errorStatistic = null;
    }
}
