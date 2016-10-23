import { Component, OnInit } from '@angular/core';

import { UserService } from './shared/user.service';
import './rxjs-operators';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {

    constructor(
        private userService: UserService
    ) {}

    title = 'app works!';

    ngOnInit() {
        this.userService.reloadUserData();
    }
    
}
