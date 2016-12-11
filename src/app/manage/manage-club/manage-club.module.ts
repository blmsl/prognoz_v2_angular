import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { FormsModule }              from '@angular/forms';
import { ReactiveFormsModule }      from '@angular/forms';
import { Ng2PaginationModule }      from 'ng2-pagination';
import { ConfirmationPopoverModule }from 'angular-confirmation-popover';

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
        FormsModule,
        ReactiveFormsModule,
        ManageClubRoutingModule,
        Ng2PaginationModule,
        ConfirmationPopoverModule.forRoot({
            confirmButtonType: 'danger',
            focusButton: 'confirm'
        })
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
