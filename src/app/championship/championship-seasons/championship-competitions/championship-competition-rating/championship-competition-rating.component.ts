import { Component, OnInit }              from '@angular/core';
import { ActivatedRoute, Params }         from '@angular/router';

import { ChampionshipRatingService }      from '../../../../championship/shared/championship-rating.service';
import { ChampionshipRating }             from '../../../../shared/models/championship-rating.model';
import { UserService }                    from '../../../../shared/user.service';

@Component({
  selector: 'app-championship-competition-rating',
  templateUrl: './championship-competition-rating.component.html',
  styleUrls: ['./championship-competition-rating.component.css']
})
export class ChampionshipCompetitionRatingComponent implements OnInit {

  constructor(
      private championshipRatingService: ChampionshipRatingService,
      private userService: UserService,
      private activatedRoute: ActivatedRoute
  ) { }

  authenticatedUser: any;
  championshipRating: ChampionshipRating[];
  spinnerChampionshipRating: boolean = false;
  errorChampionshipRating: string | Array<string>;

  ngOnInit() {
      this.authenticatedUser = this.userService.sharedUser;
      this.activatedRoute.params.forEach((params: Params) => {
          this.spinnerChampionshipRating = true;
          let competitionId = +params['competitionId'];
          this.reloadComponent();
          this.championshipRatingService.getRatingByCompetition(competitionId).subscribe(
                  response => {
                      this.championshipRating = response;
                      this.spinnerChampionshipRating = false;
                  },
                  error => {
                      this.errorChampionshipRating = error;
                      this.spinnerChampionshipRating = false;
                  }
              );
      });
  }

  private reloadComponent() {
      this.championshipRating = null;
      this.errorChampionshipRating = null;
  }

}