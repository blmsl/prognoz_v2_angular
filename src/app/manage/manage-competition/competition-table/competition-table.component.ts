import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Competition }            from '../shared/competition.model';
import { CompetitionService }     from '../shared/competition.service';

@Component({
    selector: 'app-competition-table',
    templateUrl: './competition-table.component.html',
    styleUrls: ['./competition-table.component.css']
})
export class CompetitionTableComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private competitionService: CompetitionService
    ) { }

    spinner: boolean = false;
    error: string | Array<string>;
    competitions: Competition[];

    path: string = '/manage/competitions/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    ngOnInit() {
        this.spinner = true;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.competitionService.get(params['number']).subscribe(
                response => {
                    if (!response.data) {
                        this.error = "В базі даних змагань немає";
                    } else {
                        this.currentPage = response.current_page;
                        this.lastPage = response.last_page;
                        this.perPage = response.per_page;
                        this.total = response.total;
                        this.competitions = response.data;
                    }
                    this.spinner = false;
                },
                error => {
                    this.error = error;
                    this.spinner = false;
                }
            );
        });
    }
}
