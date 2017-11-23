import { Injectable }       from '@angular/core';

import { AuthService }      from './auth.service';
import { PusherService }    from './pusher.service';
import { Subject }          from 'rxjs/Subject';
import { User }             from '../shared/models/user.model';

@Injectable()
export class CurrentStateService {

    constructor(
        private authService: AuthService,
        private pusherService: PusherService
    ) {
        this.authService.getUser.subscribe(response => {
            this.user = response;
            this.getOnlineUsers(this.user);
            // @todo: remove console.log; do something if subscription error occurs;
        });
    }

    user: User;
    onlineUsers: Array<any>;
    pusherInstance: any;
    onlineUsersObservable = new Subject<any>();

    initialize(): void {
        this.authService.initializeUser();
    }


    private addOnlineUser(userId: number, userInfo: User) {
        this.onlineUsers.push({id: userId, name: userInfo.name});
    }

    /**
     * Get list of online users (only if user is authenticated)
     * Method updates users list
     * @param {User} user
     */
    private getOnlineUsers(user: User): void {
        if (user) {
            this.pusherInstance = this.pusherService.createInstance();
            const subscription = this.pusherService.subscribeToChannel(this.pusherInstance, 'presence-users');

            this.pusherService.bindEvent(subscription, 'pusher:subscription_succeeded', (members) => {
                console.log('subscription_succeeded: ' + JSON.stringify(members));
                members.each((member) => {
                    this.addOnlineUser(member.id, member.info);
                    this.onlineUsersObservable.next({id: member.id, name: member.info.name});
                });
            });

            this.pusherService.bindEvent(subscription, 'pusher:subscription_error', (error) => {
                console.log('error: ' + error);
            });

            this.pusherService.bindEvent(subscription, 'pusher:member_added', (member) => {
                console.log('member_added' + JSON.stringify(member));
                this.addOnlineUser(member.id, member.info);
                this.onlineUsersObservable.next({id: member.id, name: member.info.name});
            });

            this.pusherService.bindEvent(subscription, 'pusher:member_removed', (member) => {
                console.log('member_removed' + JSON.stringify(member));
                this.removeOnlineUser(member.id, member.info);
                this.onlineUsersObservable.next({id: member.id, name: member.info.name});
            });

        } else if (this.pusherInstance) {
            this.pusherService.unsubscribeFromChannel(this.pusherInstance, 'presence-users');
        }
    }

    private removeOnlineUser(userId: number, userInfo: User) {
        this.onlineUsers.filter(user => user.id !== userId);
    }
}