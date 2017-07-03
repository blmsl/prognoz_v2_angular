import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';

import { ManageTournamentComponent }  from './manage-tournament.component';
import { TournamentService }          from './shared/tournament.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ManageTournamentComponent
    ],
    providers: [
        TournamentService
    ]
})
export class ManageTournamentModule { }
