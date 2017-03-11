import { Injectable }           from '@angular/core';
import { CanActivate, Router }  from '@angular/router';

import { UserService }          from '../shared/user.service';

@Injectable()
export class MeGuard implements CanActivate {

    constructor(
        private router: Router,
        private userService: UserService
    ) {}

    canActivate() {
        return this.checkRoles();
    }

    /**
     * Check if there is user userService
     *
     * @returns {boolean}
     */
    checkRoles(): boolean {
        if (this.userService.sharedUser) {
            return true;
        }
        this.router.navigate(['/403']);
        return false;
    }
}