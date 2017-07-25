import { Injectable }               from '@angular/core';

import { AuthService }              from './auth.service';
import { User }                     from '../shared/models/user.model';

@Injectable()
export class CurrentStateService {

    constructor(
        private authService: AuthService
    ) {
        this.authService.getUser.subscribe(result => this.user = result);
    }

    user: User;

    initialize() {
        this.authService.initializeUser();
    }
}