import { Component, OnDestroy, OnInit }         from '@angular/core';

import { ChampionshipMatch }                    from '../../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../../../championship/shared/championship-match.service';
import { ChampionshipRatingService }            from '../../../championship/shared/championship-rating.service';
import { environment }                          from '../../../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit, OnDestroy {

    constructor(
        private championshipMatchService: ChampionshipMatchService,
        private championshipRatingService: ChampionshipRatingService,
        private notificationService: NotificationsService
    ) { }

    activeMatches: ChampionshipMatch[];
    spinnerActiveMatches: boolean = false;
    errorActiveMatches: string;

    spinnerButton: any = {};
    updatedMatches: any = {};
    isUpdatedMatches: boolean = false;
    spinnerUpdateRatingButton: boolean = false;

    clubsImagesUrl: string = environment.apiImageClubs;
  
    ngOnInit() {
        this.spinnerActiveMatches = true;
        this.championshipMatchService.getCurrentCompetitionMatches('active').subscribe(
            response => {
                this.activeMatches = response;
                this.spinnerActiveMatches = false;
            },
            error => {
                this.errorActiveMatches = error;
                this.spinnerActiveMatches = false;
            }
        );
    }

    ngOnDestroy() { 
        if (Object.keys(this.updatedMatches).length !== 0 && this.isUpdatedMatches) {
           this.updateRating();
        }
    }

    onSubmit(id: number, home: number, away: number) {
        if (!this.validateResult(home) || !this.validateResult(away)) {
            this.notificationService.error('Помилка', 'Результат в матчі ' + id + ' введено неправильно');
            return;
        }
        this.spinnerButton['match_' + id] = true;
        let championshipMatch = new ChampionshipMatch;
        championshipMatch.home = home;
        championshipMatch.away = away;
        this.championshipMatchService.update(championshipMatch, id).subscribe(
            response => {
                this.spinnerButton['match_' + id] = false;
                this.updatedMatches['match_' + id] = response;
                this.isUpdatedMatches = true;
                this.notificationService.success('Успішно', 'Результат в матчі ' + response.id + ' добавлено!');
            },
            errors => {
                this.spinnerButton['match_' + id] = false;
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
            }
        );
    }
    
    updateRating() {
        this.spinnerUpdateRatingButton = true;
        this.championshipRatingService.updateRatingPositions().subscribe(
            response => {
                this.isUpdatedMatches = false;
                this.notificationService.success('Успішно', 'Рейтинг оновлено');
                this.spinnerUpdateRatingButton = false;
            },
            error => {
                this.notificationService.error('Помилка', 'Оновити рейтинг не вдалось');
                this.spinnerUpdateRatingButton = false;
            }
        );
    }

    private validateResult(score) {
        let regExp = /^[0-9]$/;
        return regExp.test(score);
    }
}
