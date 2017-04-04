import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';

import { ManageTournamentComponent }  from './manage-tournament.component';
import { ManageTournamentService }    from './shared/manage-tournament.service';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ManageTournamentComponent
    ],
    providers: [
        ManageTournamentService
    ]
})
export class ManageTournamentModule { }
