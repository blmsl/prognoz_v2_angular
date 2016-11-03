import { Component, OnInit }    from '@angular/core';
import { NotificationsService } from 'angular2-notifications';

import { UserService } from './shared/user.service';
import './rxjs-operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private notificationService: NotificationsService,
        private userService: UserService
    ) {}
    
    ngOnInit() {
        this.userService.initializeUser();
    }

    public options = {
        timeOut: 5000,
        maxLength: 0,
        animate: 'scale',
        position: ['left', 'bottom']
    };
}
