import { Component, OnInit } from '@angular/core';

import { ChampionshipMatch }                    from '../shared/championship-match.model';
import { ManageChampionshipService }            from '../shared/manage-championship.service';
//import { Club }                                 from '../../manage-club/shared/club.model';
import { API_IMAGE_CLUBS }                      from '../../../shared/app.settings';

@Component({
  selector: 'app-match-edit',
  templateUrl: './match-edit.component.html',
  styleUrls: ['./match-edit.component.css']
})
export class MatchEditComponent implements OnInit {

    constructor(private manageChampionshipService:ManageChampionshipService) {
    }
  
    spinnerActiveMatches: boolean = false;
    spinnerButton: boolean = false;
    activeMatches: ChampionshipMatch[];
    errorActiveMatches: string | Array<string>;
    clubsImagesUrl: string = API_IMAGE_CLUBS;
  
    ngOnInit() {
        this.spinnerActiveMatches = true;
        this.manageChampionshipService.getActive().subscribe(
            response => {
                this.activeMatches = response;
                this.spinnerActiveMatches = false;
            },
            error => {
                this.errorActiveMatches = error;
                this.spinnerActiveMatches = false;
            }
        );
    }
  
    //TODO: get all active matches
    //TODO: create table
}
