import { Component, OnInit }        from '@angular/core';

import { ChampionshipMatch }        from '../shared/models/championship-match.model';
import { ChampionshipMatchService } from '../championship/shared/championship-match.service'
import { environment }              from '../../environments/environment';
import { News }                     from '../shared/models/news.model';
import { NewsService }              from '../news/shared/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {

    constructor(
        private championshipMatchService: ChampionshipMatchService,
        private newsService: NewsService
    ) { }

    news: News[];
    spinnerNews: boolean = false;
    errorNews: string | Array<string>;
    noNews: string = 'В базі даних новин не знайдено.';

    championshipMatches: ChampionshipMatch[];
    spinnerChampionshipMatches: boolean = false;
    errorChampionshipMatches: string;

    newsImagesUrl: string = environment.apiImageNews;
    clubsImagesUrl: string = environment.apiImageClubs;

    ngOnInit() {
        this.getNewsData();
        this.getMatchesData();
    }

    private getNewsData() {
        this.spinnerNews = true;
        this.newsService.getNews().subscribe(
            result => {
                if (result) {
                    this.news = result.data;
                }
                this.spinnerNews = false;
            },
            error => {
                this.errorNews = error;
                this.spinnerNews = false;
            }
        );
    }

    private getMatchesData() {
        this.spinnerChampionshipMatches = true;
        let param = [
            {parameter: 'filter', value: 'predictable'},
            {parameter: 'coming', value: 'true'}
        ];
        this.championshipMatchService.getChampionshipMatches(param).subscribe(
            response => {
                if (response) {
                    this.championshipMatches = response.championship_matches;
                }
                this.spinnerChampionshipMatches = false;
            },
            error => {
                this.errorChampionshipMatches = error;
                this.spinnerChampionshipMatches = false;
            }
        );
    }
}
