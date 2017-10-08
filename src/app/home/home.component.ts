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

    championshipMatches: ChampionshipMatch[];
    clubsImagesUrl: string = environment.apiImageClubs;
    errorChampionshipMatches: string;
    errorNews: string | Array<string>;
    news: News[];
    newsImagesUrl: string = environment.apiImageNews;

    ngOnInit() {
        this.getNewsData();
        this.getMatchesData();
    }

    private getMatchesData() {
        let param = [
            {parameter: 'filter', value: 'predictable'},
            {parameter: 'coming', value: 'true'}
        ];
        this.championshipMatchService.getChampionshipMatches(param).subscribe(
            response => {
                if (response) {
                    this.championshipMatches = response.championship_matches;
                }
            },
            error => {
                this.errorChampionshipMatches = error;
            }
        );
    }

    private getNewsData() {
        this.newsService.getNews().subscribe(
            response => {
                if (response) {
                    this.news = response.data;
                }
            },
            error => {
                this.errorNews = error;
            }
        );
    }
}
