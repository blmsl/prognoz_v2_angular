import { Injectable }   from '@angular/core';

import { AuthService }  from './auth.service';
import { User }         from '../shared/models/user.model';

@Injectable()
export class CurrentStateService {

    constructor(
        private authService: AuthService
    ) {
        this.authService.getUser.subscribe(response => this.user = response);
    }

    user: User;

    initialize() {
        this.authService.initializeUser();
    }
}