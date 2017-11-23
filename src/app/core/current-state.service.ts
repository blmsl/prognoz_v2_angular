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
            this.getOnlineUsers(this.user);
            // @todo: remove console.log
        });
    }

    user: User;
    onlineUsers: Array<any>;
    pusherInstance: any;

    initialize(): void {
        this.authService.initializeUser();
    }

    /**
     * Get list of online users (only if user is authenticated)
     * Method updates users list
     * @param {User} user
     */
    getOnlineUsers(user: User): void {
        if (user) {
            this.pusherInstance = this.pusherService.createInstance();
            const subscription = this.pusherService.subscribeToChannel(this.pusherInstance, 'presence-users');

            this.pusherService.bindEvent(subscription, 'pusher:subscription_succeeded', (members) => {
                console.log('subscription_succeeded: ' + JSON.stringify(members));
                members.each((member) => {
                    this.addOnlineUser(member.id, member.info);
                });
            });

            this.pusherService.bindEvent(subscription, 'pusher:subscription_error', (error) => {
                console.log('error: ' + error);
            });

            this.pusherService.bindEvent(subscription, 'pusher:member_added', (member) => {
                console.log('member_added' + JSON.stringify(member));
                this.addOnlineUser(member.id, member.info);
            });

            this.pusherService.bindEvent(subscription, 'pusher:member_removed', (member) => {
                console.log('member_removed' + JSON.stringify(member));
                this.removeOnlineUser(member.id, member.info);
            });

        } else if (this.pusherInstance) {
            this.pusherService.unsubscribeFromChannel(this.pusherInstance, 'presence-users');
        }
    }

    addOnlineUser(userId: number, userInfo: User) {
        this.onlineUsers.push({id: userId, name: userInfo.name});
    }

    removeOnlineUser(userId: number, userInfo: User) {
        this.onlineUsers.filter(user => user.id !== userId);
    }
}