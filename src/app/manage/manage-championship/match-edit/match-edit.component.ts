import { Component, OnInit, OnDestroy }         from '@angular/core';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatch }                    from '../../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../../../championship/shared/championship-match.service';
import { ChampionshipRatingService }            from '../../../championship/shared/championship-rating.service';
import { environment }                          from '../../../../environments/environment';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit, OnDestroy {

    constructor(
        private notificationService: NotificationsService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipRatingService: ChampionshipRatingService
    ) { }
  
    spinnerActiveMatches: boolean = false;
    spinnerButton: any = {};
    activeMatches: ChampionshipMatch[];
    updatedMatches: any = {};
    isUpdatedMatches: boolean = false;
    errorActiveMatches: string | Array<string>;
    clubsImagesUrl: string = environment.API_IMAGE_CLUBS;
  
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
        this.championshipRatingService.updatePositions().subscribe(
            response => {
                this.isUpdatedMatches = false;
                this.notificationService.success('Успішно', 'Рейтинг оновлено');
            },
            error => {
                this.notificationService.error('Помилка', 'Оновити рейтинг не вдалось');
            }
        );
    }

    private validateResult(score) {
        let regExp = /^[0-9]$/;
        return regExp.test(score);
    }
}
