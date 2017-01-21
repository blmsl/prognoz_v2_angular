import { Component, OnInit }                    from '@angular/core';
import { NotificationsService }                 from 'angular2-notifications';

import { ChampionshipMatch }                    from '../shared/championship-match.model';
import { ManageChampionshipService }            from '../shared/manage-championship.service';
import { API_IMAGE_CLUBS }                      from '../../../shared/app.settings';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {

    constructor(
        private notificationService: NotificationsService,
        private manageChampionshipService: ManageChampionshipService
    ) { }
  
    spinnerActiveMatches: boolean = false;
    spinnerButton: boolean = false;
    activeMatches: ChampionshipMatch[];
    errorActiveMatches: string | Array<string>;
    clubsImagesUrl: string = API_IMAGE_CLUBS;
  
    ngOnInit() {
        this.spinnerActiveMatches = true;
        this.manageChampionshipService.getActive().subscribe(
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

    onSubmit(id: number, home: number, away: number) {
        if (!this.validateResult(home) || !this.validateResult(away)) {
            this.notificationService.error('Помилка', 'Результат в матчі ' + id + ' введено неправильно');
            return;
        }
        this.manageChampionshipService.addResult(id, {id: id, home: home, away: away}).subscribe(
            response => {
                //TODO: add spinner-button after click
                //TODO: after successful response disable inputs and button
                //TODO: (change match in active matches array, add check if match is ended)
                //TODO: if there is successful added results, in addedResults array, show 'update moving' button
                //TODO: 'update moving' button click send 'update moving in rating' request and empties an array
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
            }
        );
    }

    private validateResult(score) {
        let regExp = /^[0-9]$/;
        return regExp.test(score);
    }
}
