import { Component, OnInit }    from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { CurrentStateService } from './shared/current-state.service';
import './rxjs-operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private notificationService: NotificationsService,
        private currentStateService: CurrentStateService
    ) {}
    
    ngOnInit() {
        this.currentStateService.initialize();
    }

    public options = {
        position: ['right', 'bottom'],
        timeOut: 5000,
        showProgressBar: false,
        maxLength: 0,
        animate: 'scale'
    };
}
