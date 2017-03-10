import { Component, OnInit } from '@angular/core';

import { ManageSeasonService }  from '../shared/manage-season.service';
import { Season }               from '../../../shared/models/season.model';

@Component({
  selector: 'app-season-table',
  templateUrl: './season-table.component.html',
  styleUrls: ['./season-table.component.css']
})
export class SeasonTableComponent implements OnInit {

    constructor(
        private manageSeasonService: ManageSeasonService
    ) { }

    seasons: Season[];
    error: string | Array<string>;
    spinner: boolean = false;
  
    ngOnInit() {
        this.spinner = true;
        this.manageSeasonService.getSeasons().subscribe(
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
