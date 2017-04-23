import { Component, OnInit }      from '@angular/core';
import { RoutesRecognized, ActivatedRoute, Params, Router } from '@angular/router';

import { CompetitionService }     from '../../../../manage/manage-competition/shared/competition.service';
import { Competition }            from '../../../../shared/models/competition.model';

@Component({
  selector: 'app-championship-competitions-list',
  templateUrl: './championship-competitions-list.component.html',
  styleUrls: ['./championship-competitions-list.component.css']
})
export class ChampionshipCompetitionsListComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private competitionService: CompetitionService
    ) { }
    
    competitions: Competition[];
    spinnerCompetitions: boolean = false;
    errorCompetitions: string | Array<string>;
  
    ngOnInit() {
        this.spinnerCompetitions = true;


        // this.router.events.subscribe(val => {
        //     console.log('val', val);
        //     if (val instanceof RoutesRecognized) {
        //         var strId = val.state.root.firstChild.params["id"];
        //         console.log(val.state.root.firstChild.params["id"]);
        //     }});

        this.activatedRoute.params.forEach((params: Params) => {
            let season = +params['id'];
            console.log(this.activatedRoute.params);
            this.competitionService.get(season, 1, null).subscribe(
                response => {
                    this.competitions = response.data;
                    this.spinnerCompetitions = false;
                },
                error => {
                    this.errorCompetitions = error;
                    this.spinnerCompetitions = false;
                }
            );
        });
    }

}
