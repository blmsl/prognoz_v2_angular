import { Injectable }   from '@angular/core';

import { environment }  from '../../environments/environment';

declare const Pusher: any;

@Injectable()
export class PusherService {

    instance: any;

    constructor() {
        this.instance = new Pusher(environment.pusher.apiKey, {
            cluster: 'eu',
            encrypted: false
        });
    }

    subscribe(channelName: string, eventName: string, callable) {
        return this.instance.subscribe(channelName).bind(eventName, callable);
    }

    unsubscribe(channelName: string) {
        return this.instance.unsubscribe(channelName);
    }
}