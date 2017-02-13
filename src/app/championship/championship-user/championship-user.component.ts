import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { ChampionshipPredictService }     from '../shared/championship-predict.service';
import { ChampionshipPredict }            from '../shared/championship-predict.model';

@Component({
  selector: 'app-championship-user',
  templateUrl: './championship-user.component.html',
  styleUrls: ['./championship-user.component.css']
})
export class ChampionshipUserComponent implements OnInit {

    constructor(
        private championshipPredictService: ChampionshipPredictService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) { }

    spinner: boolean = false;
    predicts: ChampionshipPredict[];
    error: string;
    
    ngOnInit() {
        this.spinner = true;
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.championshipPredictService.user(id).subscribe(
                response => {
                    this.predicts = response;
                    this.spinner = false;
                },
                error => {
                    this.spinner = false;
                    this.error = error;
                }
            );
        });
    }

    showScore(home, away, noScore: string) {
        if ((home != null) && (away != null)) {
            return home + ' : ' + away;
        }

        return noScore;
    }
}
