import { Component, OnInit } from '@angular/core';

import { SeasonService }     from '../shared/season.service';
import { Season }            from '../../../shared/models/season.model';

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
    error: string | Array<string>;
    spinner: boolean = false;
  
    ngOnInit() {
        this.spinner = true;
        this.seasonService.getSeasons().subscribe(
            response => {
                this.seasons = response;
                this.spinner = false;
            }, 
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }

}
