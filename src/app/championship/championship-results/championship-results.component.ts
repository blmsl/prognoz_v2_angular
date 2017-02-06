import { Component, OnInit }        from '@angular/core';

import { API_IMAGE_CLUBS }          from '../../shared/app.settings';
import { ChampionshipMatchService } from '../shared/championship-match.service';
import { ChampionshipMatch }        from '../shared/championship-match.model';

@Component({
  selector: 'app-championship-results',
  templateUrl: './championship-results.component.html',
  styleUrls: ['./championship-results.component.css']
})
export class ChampionshipResultsComponent implements OnInit {

    constructor(private championshipMatchService: ChampionshipMatchService) {
    }

    spinner: boolean = false;
    matches: ChampionshipMatch[];
    error: string;
    clubsImagesUrl: string = API_IMAGE_CLUBS;
  
    ngOnInit() {
        this.spinner = true;
        this.championshipMatchService.getEnded().subscribe(
            response => {
                this.spinner = false;
                this.matches = response;
            },
            error => {
                this.error = error;
                this.spinner = false;
            }
        );
    }

}
