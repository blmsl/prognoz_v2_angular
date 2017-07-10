import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params }         from '@angular/router';

import { Club }                           from '../../../shared/models/club.model';
import { ClubService }                    from '../shared/club.service';
import { environment }                    from '../../../../environments/environment';
import { NotificationsService }           from 'angular2-notifications';

@Component({
  selector: 'app-club-table',
  templateUrl: './club-table.component.html',
  styleUrls: ['./club-table.component.css']
})
export class ClubTableComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private clubService: ClubService,
        private notificationService: NotificationsService
    ) { }

    clubs: Club[];
    errorClubs: string | Array<string>;
    spinnerClubs: boolean = false;
    noClubs: string = 'В базі даних команд не знайдено.';
    clubsImagesUrl: string = environment.apiImageClubs;

    path: string = '/manage/clubs/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    title: string = 'Підтвердження';
    message: string = 'Ви дійсно бажаєте видалити';
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;
  
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetData();
            this.spinnerClubs = true;
            let page = params['number'] ? params['number'] : 1;
            this.clubService.getClubs(page).subscribe(
                result => {
                    if (result) {
                        this.currentPage = result.current_page;
                        this.lastPage = result.last_page;
                        this.perPage = result.per_page;
                        this.total = result.total;
                        this.clubs = result.data;
                    }
                    this.spinnerClubs = false;
                },
                error => {
                    this.errorClubs = error;
                    this.spinnerClubs = false;
                }
            )
        });
    }

    deleteClub(club) {
        this.clubService.deleteClub(club.id)
            .subscribe(
                response => {
                    this.total--;
                    this.clubs = this.clubs.filter(n => n !== club);
                    this.notificationService.success('Успішно', club.title + ' видалено');
                },
                errors => {
                    for (let error of errors) {
                        this.notificationService.error('Помилка', error);
                    }
                });
    }

    private resetData() {
        this.clubs = null;
        this.errorClubs = null;
    }
}
