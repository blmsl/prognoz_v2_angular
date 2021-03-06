import { CommonModule }              from '@angular/common';
import { NgModule }                  from '@angular/core';
import { ReactiveFormsModule }       from '@angular/forms';

import { ClubCreateComponent }       from './club-create/club-create.component';
import { ClubEditComponent }         from './club-edit/club-edit.component';
import { ClubService }               from './shared/club.service';
import { ClubTableComponent }        from './club-table/club-table.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ManageClubComponent }       from './manage-club.component';
import { ManageClubGuard }           from './shared/manage-club-guard.service';
import { ManageClubRoutingModule }   from './manage-club-routing.module';
import { SharedModule }              from '../../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        ManageClubRoutingModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger',
            focusButton: 'confirm'
        }),
        SharedModule
    ],
    declarations: [
        ManageClubComponent,
        ClubTableComponent,
        ClubCreateComponent,
        ClubEditComponent
    ],
    providers: [
        ManageClubGuard,
        ClubService
    ]
})
export class ManageClubModule { }
