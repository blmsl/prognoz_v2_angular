import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';
import { ConfirmationPopoverModule }from 'angular-confirmation-popover';

import { DirectivesModule }         from '../../shared/directives/directives.module';
import { ManageClubComponent }      from './manage-club.component';
import { ManageClubRoutingModule }  from './manage-club-routing.module';
import { ManageClubGuard }          from './shared/manage-club-guard.service';
import { ManageClubService }        from './shared/manage-club.service';
import { ClubCreateComponent }      from './club-create/club-create.component';
import { ClubEditComponent }        from './club-edit/club-edit.component';
import { ClubTableComponent }       from './club-table/club-table.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageClubRoutingModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger',
            focusButton: 'confirm'
        }),
        DirectivesModule
    ],
    declarations: [
        ManageClubComponent,
        ClubTableComponent,
        ClubCreateComponent,
        ClubEditComponent
    ],
    providers: [
        ManageClubGuard,
        ManageClubService
    ]
})
export class ManageClubModule { }
