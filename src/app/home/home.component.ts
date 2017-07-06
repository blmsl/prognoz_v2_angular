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
    newsImagesUrl: string = environment.apiImageNews;

    matches: ChampionshipMatch[];
    spinnerMatches: boolean = false;
    errorMatches: string | Array<string>;
    clubsImagesUrl: string = environment.apiImageClubs;

    ngOnInit() {
        this.getNews();
        this.getMatches();
    }

    private getNews() {
        this.spinnerNews = true;
        this.newsService.getNews().subscribe(
            result => {
                this.news = result ? result.data : [];
                this.spinnerNews = false;
            },
            error => {
                this.errorNews = error;
                this.spinnerNews = false;
            }
        );
    }

    private getMatches() {
        this.spinnerMatches = true;
        this.championshipMatchService.getPredictableMatches(null, true).subscribe(
            response => {
                this.matches = response;
                this.spinnerMatches = false;
            },
            error => {
                this.errorMatches = error;
                this.spinnerMatches = false;
            }
        );
    }
}
