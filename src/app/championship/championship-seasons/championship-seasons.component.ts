import { Component, OnInit } from '@angular/core';

import { Season }              from '../../shared/models/season.model';
import { ManageSeasonService } from '../../manage/manage-season/shared/manage-season.service';

@Component({
  selector: 'app-championship-seasons',
  templateUrl: './championship-seasons.component.html',
  styleUrls: ['./championship-seasons.component.css']
})
export class ChampionshipSeasonsComponent implements OnInit {

    constructor(
        private manageSeasonService: ManageSeasonService
    ) { }

    seasons: Season[];
    errorSeasons: string | Array<string>;
    spinnerSeasons: boolean = false;

  ngOnInit() {
      this.spinnerSeasons = true;
      this.manageSeasonService.getSeasons().subscribe(
          result => {
              this.seasons = result;
              this.spinnerSeasons = false;
          },
          error => {
              this.errorSeasons = error;
              this.spinnerSeasons = false;
          }
      );
  }

}
