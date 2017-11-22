import { Injectable }   from '@angular/core';

import { environment }  from '../../environments/environment';

declare const Pusher: any;

@Injectable()
export class PusherService {

    instance: any;
    channelSubscription: any;

    private channelName: string;

    constructor() {
        this.instance = new Pusher(environment.pusher.apiKey, {
            cluster: 'eu',
            encrypted: false,
            authEndpoint: environment.apiUrl + 'auth/pusher',
            auth: {
                headers: {
                    'Authorization': 'Bearer {' + localStorage.getItem('auth_token') + '}'
                }
            }
        });
    }

    setChannelName(channelName: string): void {
        this.channelName = channelName;
    }

    subscribeToChannel(): void {
        this.channelSubscription = this.instance.subscribe(this.channelName); //.bind(eventName, callable)
    }

    unsubscribeFromChannel(): void {
        if (this.channelName) {
            this.instance.unsubscribe(this.channelName);
        }
    }

    bindEvent(eventName: string, callback): void {
        this.channelSubscription.bind(eventName, callback);
    }
}