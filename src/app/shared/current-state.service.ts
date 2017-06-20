import { Injectable }               from '@angular/core';

import { AuthService }              from './auth.service';

@Injectable()
export class CurrentStateService {

    constructor(
        private authService: AuthService
    ){}

    initialize() {
        this.authService.initializeUser();
    }
}