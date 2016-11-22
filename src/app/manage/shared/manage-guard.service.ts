import { Injectable }           from '@angular/core';
import { CanActivate, Router }  from '@angular/router';

@Injectable()
export class ManageGuard implements CanActivate {
    
    constructor(
        private router: Router
    ) {}
    
    canActivate() {
        return this.checkRoles();
    }

    /**
     * Check if user have some roles in localStorage
     *
     * @returns {boolean}
     */
    checkRoles(): boolean {
        if (!!localStorage.getItem('roles') && !!localStorage.getItem('auth_token')) {
            return true;
        }
        this.router.navigate(['/signin']);
        return false;
    }
}