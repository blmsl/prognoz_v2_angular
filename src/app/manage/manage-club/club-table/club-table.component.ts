import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { NotificationsService }           from 'angular2-notifications';

import { ManageClubService }              from '../shared/manage-club.service';
import { Club }                           from '../shared/club.model';
import { API_IMAGE_CLUBS }                from '../../../shared/app.settings';

@Component({
  selector: 'app-club-table',
  templateUrl: './club-table.component.html',
  styleUrls: ['./club-table.component.css']
})
export class ClubTableComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private notificationService: NotificationsService,
        private manageClubService: ManageClubService
    ) { }

    clubs: Club[];
    error: string | Array<string>;
    clubsImagesUrl: string = API_IMAGE_CLUBS;

    /**
     * Variables for pagination work
     */
    path: string = '/manage/clubs/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    /**
     * Variables for confirmation popup
     */
    title: string = 'Підтвердження';
    message: string = 'Ви дійсно бажаєте видалити';
    confirmClicked: boolean = false;
    cancelClicked: boolean = false;
  
    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            let page = params['number'] ? params['number'] : 1;
            this.manageClubService.getClubs(page).subscribe(
                result => {
                    if (!result.data) {
                        this.error = "В базі даних клубів/збірних немає";
                    } else {
                        this.currentPage = result.current_page;
                        this.lastPage = result.last_page;
                        this.perPage = result.per_page;
                        this.total = result.total;
                        this.clubs = result.data;
                    }
                },
                error => this.error = error
            )
        });
    }

    /**
     * Delete one club
     *
     * @param club
     */
    delete(club) {
        this.manageClubService.delete(club.id).subscribe(
            response => {
                this.total--;
                this.clubs = this.clubs.filter(n => n !== club);
                this.notificationService.success('Успішно', club.title + ' видалено');
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
            }
        );
    }

}
