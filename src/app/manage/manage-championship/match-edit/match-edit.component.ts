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
    spinnerButton: any = {};
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
        this.spinnerButton['match_' + id] = true;
        this.manageChampionshipService.addResult({id: id, home: home, away: away}).subscribe(
            response => {
                this.spinnerButton['match_' + id] = false;
                //TODO: after successful response:
                //TODO: 1) receive updated match data from rest and add it to 'updateMatches' array
                //TODO: 2) disable inputs and button of updated match + highlight green color
                //TODO: 3) if there is items in 'updatedMatches' array, show 'update moving' button
                //TODO: 4) 'update moving' button click send put request to /championship/rating/?moving and empties an array
            },
            errors => {
                this.spinnerButton['match_' + id] = false;
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
                //TODO: after bad response:
                //TODO: 1) highlight table row in red color
            }
        );
    }

    private validateResult(score) {
        let regExp = /^[0-9]$/;
        return regExp.test(score);
    }
}
