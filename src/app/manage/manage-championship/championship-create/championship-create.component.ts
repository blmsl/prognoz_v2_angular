import { Component, OnInit } from '@angular/core';

import { CompetitionService } from '../../shared/competition.service';

@Component({
  selector: 'app-championship-create',
  templateUrl: './championship-create.component.html',
  styleUrls: ['./championship-create.component.css']
})
export class ChampionshipCreateComponent implements OnInit {

    constructor(
        private competitionService: CompetitionService
    ) { }

    spinner: boolean = false;
    success: string | boolean;
    error: string | boolean;
  
    ngOnInit() {
    }

    onSubmit() {
        this.spinner = true;
        this.competitionService.create({type: 'championship'}).subscribe(
            response => {
                this.error = false;
                this.success = response;
                this.spinner = false;
            },
            error => {
                this.success = false;
                this.error = error;
                this.spinner = false;
            }
        );
    }
}
