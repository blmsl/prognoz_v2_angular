import { Component, OnInit }   from '@angular/core';

import { Season }              from '../../shared/models/season.model';
import { SeasonService }       from '../../manage/manage-season/shared/season.service';

@Component({
  selector: 'app-championship-seasons',
  templateUrl: './championship-seasons.component.html',
  styleUrls: ['./championship-seasons.component.css']
})
export class ChampionshipSeasonsComponent implements OnInit {

    constructor(
        private seasonService: SeasonService
    ) { }

    errorSeasons: string | Array<string>;
    noSeasons: string = 'В базі даних сезонів не знайдено.';
    seasons: Season[];
    spinnerSeasons: boolean = false;

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
