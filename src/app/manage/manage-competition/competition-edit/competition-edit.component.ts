import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Location }                             from '@angular/common';

import { Competition }                          from '../shared/competition.model';
import { CompetitionService }                   from '../shared/competition.service';
import { ManageSeasonService }                  from '../../manage-season/shared/manage-season.service';
import { ManageTournamentService }              from '../../manage-tournament/shared/manage-tournament.service';
import { Season }                               from '../../manage-season/shared/season.model';
import { Tournament }                           from '../../manage-tournament/shared/tournament.model';


@Component({
  selector: 'app-competition-edit',
  templateUrl: './competition-edit.component.html',
  styleUrls: ['./competition-edit.component.css']
})
export class CompetitionEditComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private formBuilder: FormBuilder,
        private location: Location,
        private notificationService: NotificationsService,
        private competitionService: CompetitionService,
        private manageSeasonService: ManageSeasonService,
        private manageTournamentService: ManageTournamentService
    ) { }

    spinner: boolean = false;
    spinnerButton: boolean = false;
    error: string | boolean;
    seasons: Season[];
    tournaments: Tournament[];
    competition: Competition;
    competitionEditForm: FormGroup;

    ngOnInit() {
        this.competitionEditForm = this.formBuilder.group({
            id: ['', [Validators.required]],
            title: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(50)]],
            season_id: ['', [Validators.required]],
            tournament_id: ['', [Validators.required]],
            active: ['', [Validators.required]],
            ended: ['', [Validators.required]]
        });  
      
        this.spinner = true;
        this.activatedRoute.params.forEach((params: Params) => {
            let id = +params['id'];
            this.competitionService.getCompetition(id).subscribe(
                response => {
                    this.competition = response;
                    this.competitionEditForm.patchValue({
                        id: response.id,
                        title: response.title,
                        season_id: response.season_id,
                        tournament_id: response.tournament_id,
                        active: response.active,
                        ended: response.ended
                    });
                    this.spinner = false;
                },
                error => {
                    this.error = error;
                    this.spinner = false;
                }
            );
        });

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

        this.spinner = true;
        this.manageTournamentService.getTournaments().subscribe(
            response => {
              this.tournaments = response;
              this.spinner = false;
            },
            error => {
              this.error = error;
              this.spinner = false;
            }
        );
        
    }
    onSubmit() {
        this.spinnerButton = true;
        this.competitionService
            .update(this.competition.id, this.competitionEditForm.value)
            .subscribe(
                response => {
                    this.spinnerButton = false;
                    this.notificationService.success('Успішно', 'Змагання змінено');
                    this.location.back();
                },
                errors => {
                    for (let error of errors) {
                      this.notificationService.error('Помилка', error);
                    }
                    this.spinnerButton = false;
                }
            );
    }

}
