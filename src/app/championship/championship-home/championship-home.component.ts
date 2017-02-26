import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup }               from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatchService }             from '../shared/championship-match.service';
import { ChampionshipPredictService }           from '../shared/championship-predict.service';
import { ChampionshipRatingService }            from '../shared/championship-rating.service';
import { NewsService }                          from '../../news/shared/news.service';
import { UserService }                          from '../../shared/user.service';
import { HelperService }                        from '../../shared/helper.service';
import { ChampionshipPredict }                  from '../shared/championship-predict.model';
import { ChampionshipMatch }                    from '../shared/championship-match.model';
import { ChampionshipRating }                   from '../shared/championship-rating.model';
import { News }                                 from '../../news/shared/news.model';
import { API_IMAGE_CLUBS }                      from '../../shared/app.settings';
import { API_IMAGE_USERS }                      from '../../shared/app.settings';
import { API_IMAGE_NEWS }                       from '../../shared/app.settings';
import { IMAGE_USER_DEFAULT }                   from '../../shared/app.settings';

@Component({
  selector: 'app-championship-home',
  templateUrl: './championship-home.component.html',
  styleUrls: ['./championship-home.component.css']
})
export class ChampionshipHomeComponent implements OnInit {

    constructor(
        private notificationService: NotificationsService,
        private userService: UserService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipPredictService: ChampionshipPredictService,
        private championshipRatingService: ChampionshipRatingService,
        private newsService: NewsService,
        public helperService: HelperService,
    ) { }

    authenticatedUser: any = this.userService.sharedUser;
    clubsImagesUrl: string = API_IMAGE_CLUBS;
    userImagesUrl: string = API_IMAGE_USERS;
    userImageDefault: string = IMAGE_USER_DEFAULT;
    newsImagesUrl: string = API_IMAGE_NEWS;

    /* predictions form / matches */
    spinnerMatches: boolean = false;
    spinnerButton: boolean = false;
    error: string | Array<string>;
    matches: ChampionshipMatch[];
    championshipPredictsTodayForm: FormGroup;
    matchesToday: boolean = true;
    matchesTomorrow: boolean = true;

    /* last predictions */
    spinnerPredictions: boolean = false;
    errorPredictions: string | Array<string>;
    predictions: ChampionshipPredict[];

    /* rating */
    spinnerRating: boolean = false;
    errorRating: string | Array<string>;
    rating: ChampionshipRating[];

    /* news */
    spinnerNews: boolean = false;
    errorNews: string | Array<string>;
    news: News[];

    /**
     * Get matches, get predictions, get rating, get news
     */
    ngOnInit() {
        this.getMatches('today');
        this.getTopRating();
        this.getLastPredictions();
        this.getLastNews();
    }

    /**
     * Submit predictions form
     *
     * @param date
     */
    onSubmit(date: string = 'today') {
        this.spinnerButton = true;
        let predicts = [];
        for (let predict in this.championshipPredictsTodayForm.value) {
            let id = parseInt(predict.split('_')[0]);
            // if there is no predicts on match
            if ((this.championshipPredictsTodayForm.value[id + '_home'] === null) && (this.championshipPredictsTodayForm.value[id + '_away'] === null)) {
                continue;
            }
            let currentMatch = predicts.find(myObj => myObj.params.match_id === id);
            if (!currentMatch) {
                // if there is predict only on home team
                if ((this.championshipPredictsTodayForm.value[id + '_home'] !== null) && (this.championshipPredictsTodayForm.value[id + '_away'] === null)) {
                    predicts.push({params: {match_id: id}, values: {home: this.championshipPredictsTodayForm.value[id + '_home'], away: 0}});
                    continue;
                }
                // if there is predict only on away team
                if ((this.championshipPredictsTodayForm.value[id + '_home'] === null) && (this.championshipPredictsTodayForm.value[id + '_away'] !== null)) {
                    predicts.push({params: {match_id: id}, values: {home: 0, away: this.championshipPredictsTodayForm.value[id + '_away']}});
                    continue;
                }
                // if there is predicts on two teams
                predicts.push({
                    params: {
                        match_id: id,
                    },
                    values: {
                        home: this.championshipPredictsTodayForm.value[id + '_home'],
                        away: this.championshipPredictsTodayForm.value[id + '_away']
                    }
                });
            }
        }
        
        this.championshipPredictService.update(predicts)
            .subscribe(
                response => {
                    // this.updateForm(response);
                    this.spinnerButton = false;
                    this.notificationService.success('Успішно', 'Прогнози прийнято');
                    this.getMatches(date);
                    this.getLastPredictions();
                },
                error => {
                    this.spinnerButton = false;
                    this.notificationService.error('Помилка', error);
                }
            );
    }

    /**
     * Get matches with/without predictions by date
     *
     * @param date
     */
    public getMatches(date: string = 'today') {
        this.spinnerMatches = true;
        this.championshipMatchService.getPredictableMatchesByDate(date).subscribe(
            response => {
                if ((date === 'today') && !response.length) {
                    this.matchesToday = false;
                    this.getMatches('tomorrow');
                } else if  ((date === 'tomorrow') && !response.length) {
                    this.matchesTomorrow = false;
                } else {
                    this.updateForm(response);
                }
                this.spinnerMatches = false;
            },
            error => {
                this.error = error;
                this.spinnerMatches = false;
            }
        );
    }

    /**
     * Create inputs in predictions form
     *
     * @param matches
     */
    private updateForm(matches: ChampionshipMatch[]) {
        this.matches = matches;
        if (this.authenticatedUser) {
            this.championshipPredictsTodayForm = new FormGroup({});
            for (let match of this.matches) {
                let home = match.championship_predicts[0] ? match.championship_predicts[0].home : null;
                let away = match.championship_predicts[0] ? match.championship_predicts[0].away : null;
                this.championshipPredictsTodayForm.addControl(match.id + '_home', new FormControl(home));
                this.championshipPredictsTodayForm.addControl(match.id + '_away', new FormControl(away));
            }
        }
    }

    /**
     * Get last predictions
     */
    public getLastPredictions() {
        this.spinnerPredictions = true;
        this.championshipPredictService.get().subscribe(
            response => {
                this.predictions = response;
                this.spinnerPredictions = false;
            },
            error => {
                this.errorPredictions = error;
                this.spinnerPredictions = false;
            }
        );
    }

    /**
     * Get top rating
     */
    public getTopRating() {
        this.spinnerRating = true;
        this.championshipRatingService.get('top').subscribe(
            response => {
                this.rating = response;
                this.spinnerRating = false;
            },
            error => {
                this.error = error;
                this.spinnerRating = false;
            }
        );
    }

    /**
     * Get last news
     */
    public getLastNews() {
        this.spinnerNews = true;
        this.newsService.getNews().subscribe(
            response => {
                this.news = response.data;
                this.spinnerNews = false;
            },
            error => {
                this.error = error;
                this.spinnerNews = false;
            }
        );
    }
}
