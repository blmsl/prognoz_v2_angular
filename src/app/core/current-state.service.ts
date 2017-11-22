import { Injectable }       from '@angular/core';

import { AuthService }      from './auth.service';
import { User }             from '../shared/models/user.model';
import { PusherService }    from './pusher.service';

@Injectable()
export class CurrentStateService {

    constructor(
        private authService: AuthService,
        private pusherService: PusherService
    ) {
        this.authService.getUser.subscribe(response => {
            this.user = response;
            if (this.user) {
                this.pusherService.setChannelName('presence-users');
                this.pusherService.subscribeToChannel();
                this.pusherService.bindEvent('pusher:subscription_succeeded', (members) => {
                    console.log('subscription_succeeded: ' + members);
                    this.onlineUsers = members;
                });

                this.pusherService.bindEvent('pusher:subscription_error', (error) => {
                    console.log('error: ' + error);
                });

                this.pusherService.bindEvent('pusher:member_added', (member) => {
                    console.log('member_added');
                    //this.onlineUsers.push(member);
                });

                this.pusherService.bindEvent('pusher:member_removed', (member) => {
                    console.log('member_removed');
                    // @todo: remove user
                    // this.onlineUsers.
                });
            } else {
                this.pusherService.unsubscribeFromChannel();
            }
        });
    }

    user: User;
    onlineUsers: any;

    initialize() {
        this.authService.initializeUser();
    }
}