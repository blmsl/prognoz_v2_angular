import { Injectable }     from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Router }         from '@angular/router';
import { Observable }     from "rxjs/Rx";

import { ManageService }  from './manage.service.ts';

@Injectable()
export class ManageGuard implements CanActivate {
    
    constructor(
        private router: Router,
        private manageService: ManageService
    ) {}
    
    canActivate() {
        return this.checkRoles();
    }
    
    checkRoles(): Observable<boolean> | boolean {
        if (!!localStorage.getItem('auth_token')) {
            return this.manageService.managePageGuard().map(res => {
                if (res) {
                    return true;
                }
            }).catch(() => {
                this.router.navigate(['/signin']);
                return Observable.of(false);
            })
        } else {
            this.router.navigate(['/signin']);
            return false;
        }
    }
}