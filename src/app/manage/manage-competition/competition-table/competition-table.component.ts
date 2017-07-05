import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Competition }            from '../../../shared/models/competition.model';
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

    competitions: Competition[];
    spinnerCompetitions: boolean = false;
    errorCompetitions: string;
    noCompetitions: string;

    path: string = '/manage/competitions/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetData();
            this.spinnerCompetitions = true;
            this.competitionService.getCompetitions(params['number'] || 1).subscribe(
                response => {
                    if (response.data) {
                        this.currentPage = response.current_page;
                        this.lastPage = response.last_page;
                        this.perPage = response.per_page;
                        this.total = response.total;
                        this.competitions = response.data;
                    } else {
                        this.noCompetitions = 'В базі даних змагань не знайдено.'
                    }
                    this.spinnerCompetitions = false;
                },
                error => {
                    this.errorCompetitions = error;
                    this.spinnerCompetitions = false;
                }
            );
        });
    }

    private resetData(): void {
        this.competitions = null;
        this.errorCompetitions = null;
    }
}
