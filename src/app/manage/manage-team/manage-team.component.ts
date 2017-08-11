import { Component, OnInit }    from '@angular/core';

import { Competition }          from '../../shared/models/competition.model';
import { CompetitionService }   from '../manage-competition/shared/competition.service';
import { environment }          from '../../../environments/environment';
import { NotificationsService } from "angular2-notifications";

declare var $: any;

@Component({
    selector: 'app-manage-team',
    templateUrl: './manage-team.component.html',
    styleUrls: ['./manage-team.component.css']
})
export class ManageTeamComponent implements OnInit {

    errorCompetition: string;
    competition: Competition;
    confirmModalData: any;
    confirmModalId: string;
    confirmModalMessage: string;
    confirmSpinnerButton: boolean = false;
    spinnerCompetition: boolean = false;

    constructor(
        private competitionService: CompetitionService,
        private notificationService: NotificationsService
    ) { }

    confirmModalSubmit(data: any) {
        switch (this.confirmModalId) {
            case 'startDrawConfirmModal':
                this.startDraw(data);
                break;
        }
    }

    ngOnInit() {
        this.spinnerCompetition = true;
        this.competitionService.getCompetitions(null, environment.tournaments.team.id, null, true)
            .subscribe(
                response => {
                    if (response) this.competition = response.competitions[0];
                    this.spinnerCompetition = false;
                },
                error => {
                    this.errorCompetition = error;
                    this.spinnerCompetition = false;
                }
            );
    }

    startDraw(competition: Competition) {
        this.confirmSpinnerButton = true;
        let competitionToUpdate = Object.assign({}, competition);
        competitionToUpdate.stated = false;
        competitionToUpdate.active = true;
        this.competitionService.updateCompetition(competitionToUpdate).subscribe(
            response => {
                this.notificationService.success('Успішно', 'Жеребкування календаря проведено');
                this.confirmSpinnerButton = false;
                $('#' + this.confirmModalId).modal('hide');
            },
            errors => {
                errors.forEach(error => this.notificationService.error('Помилка', error));
                this.confirmSpinnerButton = false;
                $('#' + this.confirmModalId).modal('hide');
            }
        );
    }

    startDrawConfirmModalOpen() {
        this.confirmModalMessage = 'Ви справді хочете провести жеребкування календаря?';
        this.confirmModalId = 'startDrawConfirmModal';
        this.confirmModalData = this.competition;
    }
}
