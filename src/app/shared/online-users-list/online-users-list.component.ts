import { Component, OnDestroy, OnInit } from '@angular/core';

import { User }                         from '../models/user.model';
import { CurrentStateService }          from '../../core/current-state.service';
import { HelperService }                from '../../core/helper.service';
import { Subscription }                 from 'rxjs/Subscription';

@Component({
    selector: 'app-online-users-list',
    templateUrl: './online-users-list.component.html',
    styleUrls: ['./online-users-list.component.css']
})
export class OnlineUsersListComponent implements OnDestroy, OnInit {

    constructor(
        private currentStateService: CurrentStateService,
        private helperService: HelperService
    ) { }

    users: User[];
    onlineUserSubscription: Subscription;

    ngOnDestroy() {
        if (!this.onlineUserSubscription.closed) {
            this.onlineUserSubscription.unsubscribe();
        }
    }

    ngOnInit() {
        this.onlineUserSubscription = this.currentStateService.onlineUserObservable.subscribe(value => {
            if (!this.helperService.isElementInArray(this.users, 'id', value.id)) {
                this.users.push(value);
            } else {
                this.users = this.users.filter(user => user.id !== value.id);
            }
        });
    }
}
