import { Component, OnInit, OnDestroy }         from '@angular/core';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatch }                    from '../shared/championship-match.model';
import { ManageChampionshipMatchService }       from '../shared/manage-championship-match.service';
import { ManageChampionshipRatingService }      from '../shared/manage-championship-rating.service';
import { ManageClubService }                    from '../../manage-club/shared/manage-club.service';
import { Club }                                 from '../../manage-club/shared/club.model';
import { API_IMAGE_CLUBS }                      from '../../../shared/app.settings';

@Component({
  selector: 'app-match-edit-ended',
  templateUrl: './match-edit-ended.component.html',
  styleUrls: ['./match-edit-ended.component.css']
})
export class MatchEditEndedComponent implements OnInit, OnDestroy {

    constructor(private notificationService: NotificationsService,
                private manageChampionshipMatchService: ManageChampionshipMatchService,
                private manageChampionshipRatingService: ManageChampionshipRatingService,
                private manageClubService: ManageClubService) {
    }

    endedMatches: Array<ChampionshipMatch> = [];
    clubs: Array<Club> = [];
    errorEndedMatches: string | Array<string>;
    errorClubs: string | Array<string>;
    spinnerEndedMatches: boolean = false;
    spinnerClubs: boolean = false;
    spinnerButton: any = {};
    clubsImagesUrl: string = API_IMAGE_CLUBS;
    updatedMatches: any = {};
    isUpdatedMatches: boolean = false;

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
        this.manageChampionshipMatchService.getCurrentCompetitionMatches('ended').subscribe(
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
        this.manageClubService.getClubs().subscribe(
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
        this.manageChampionshipMatchService.updateMatch({
            id: id,
            t1_id: t1_id,
            t2_id: t2_id,
            home: home,
            away: away
        }).subscribe(
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
        this.manageChampionshipRatingService.updatePositions().subscribe(
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