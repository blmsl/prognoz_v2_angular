import { Component, OnDestroy, OnInit }         from '@angular/core';

import { ChampionshipMatch }                    from '../../../shared/models/championship-match.model';
import { ChampionshipMatchService }             from '../../../championship/shared/championship-match.service';
import { ChampionshipRatingService }            from '../../../championship/shared/championship-rating.service';
import { Club }                                 from '../../../shared/models/club.model';
import { ClubService }                          from '../../manage-club/shared/club.service';
import { environment }                          from '../../../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';

@Component({
  selector: 'app-match-edit-ended',
  templateUrl: './match-edit-ended.component.html',
  styleUrls: ['./match-edit-ended.component.css']
})
export class MatchEditEndedComponent implements OnInit, OnDestroy {

    constructor(
        private notificationService: NotificationsService,
        private championshipMatchService: ChampionshipMatchService,
        private championshipRatingService: ChampionshipRatingService,
        private clubService: ClubService
    ) { }

    endedMatches: Array<ChampionshipMatch> = [];
    errorEndedMatches: string | Array<string>;
    spinnerEndedMatches: boolean = false;

    clubs: Club[];
    errorClubs: string | Array<string>;
    spinnerClubs: boolean = false;
    noClubs: string = 'В базі даних команд не знайдено.';
    clubsImagesUrl: string = environment.apiImageClubs;

    spinnerButton: any = {};
    updatedMatches: any = {};
    isUpdatedMatches: boolean = false;
    spinnerUpdateRatingButton: boolean = false;

    ngOnInit() {
        this.getEnded();
        this.getClubs();
    }

    ngOnDestroy() {
        if (Object.keys(this.updatedMatches).length !== 0 && this.isUpdatedMatches) {
            this.updateRating();
        }
    }
  
    private getEnded() {
        this.spinnerEndedMatches = true;
        this.championshipMatchService.getCurrentCompetitionMatches('ended').subscribe(
            response => {
              this.endedMatches = response;
              this.spinnerEndedMatches = false;
            },
            error => {
              this.errorEndedMatches = error;
              this.spinnerEndedMatches = false;
            }
        );
    }
  
    private getClubs() {
        this.spinnerClubs = true;
        this.clubService.getClubs().subscribe(
            response => {
              this.clubs = response;
              this.spinnerClubs = false;
            },
            error => {
              this.errorClubs = error;
              this.spinnerClubs = false;
            }
        );
    }

    onSubmit(id: number, t1_id: number, t2_id: number, home: number, away: number) {
        if (!this.validateResult(home) || !this.validateResult(away)) {
            this.notificationService.error('Помилка', 'Результат в матчі ' + id + ' введено неправильно');
            return;
        }
        this.spinnerButton['match_' + id] = true;
        let championshipMatch = new ChampionshipMatch;
        championshipMatch.t1_id = t1_id;
        championshipMatch.t2_id = t2_id;
        championshipMatch.home = home;
        championshipMatch.away = away;
        this.championshipMatchService.update(championshipMatch, id).subscribe(
            response => {
                this.spinnerButton['match_' + id] = false;
                this.updatedMatches['match_' + id] = response;
                this.isUpdatedMatches = true;
                this.notificationService.success('Успішно', 'Результат матчу ' + response.id + ' змінено');
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