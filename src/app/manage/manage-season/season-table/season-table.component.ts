import { Component, OnInit } from '@angular/core';

import { Season }            from '../../../shared/models/season.model';
import { SeasonService }     from '../shared/season.service';

@Component({
  selector: 'app-season-table',
  templateUrl: './season-table.component.html',
  styleUrls: ['./season-table.component.css']
})
export class SeasonTableComponent implements OnInit {

    constructor(
        private seasonService: SeasonService
    ) { }

    seasons: Season[];
    errorSeasons: string | Array<string>;
    spinnerSeasons: boolean = false;
    noSeasons: string = 'В базі даних сезонів не знайдено.';
  
    ngOnInit() {
        this.spinnerSeasons = true;
        this.seasonService.getSeasons().subscribe(
            response => {
                if (response) {
                    this.seasons = response.seasons;
                }
                this.spinnerSeasons = false;
            }, 
            error => {
                this.errorSeasons = error;
                this.spinnerSeasons = false;
            }
        );
    }

}
