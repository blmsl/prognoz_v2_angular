import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router
    ) { }

    user: any;
    errorMessage: string;
    
    onSubmit(name, password) {
        this.userService.login(name, password)
            .subscribe(
                result => {
                    if (result) {
                        this.user = result;
                        this.userService.addSharedUser(result);
                        alert('Аутентифікація успішна!');
                        this.router.navigate(['/']);
                    }
                },
                error => {
                    if(error.json().status_code === 401){
                        this.errorMessage = <any>error.json();
                    } else if(error.json().status_code === 422) {
                        this.errorMessage = <any>error.json().errors;
                    }
                }
            );
    }
    
    ngOnInit() {
        this.userService.sharedUser$.subscribe(latestCollection => {
            this.user = latestCollection;
        });
        this.userService.loadSharedUser();
        if (!this.user) this.user = JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        this.userService.logout();
        this.user = false;
        this.userService.addSharedUser(false);
    }
}
