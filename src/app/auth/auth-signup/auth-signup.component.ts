import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

import { User }                 from './auth-signup.interface';
import { AuthSignupService }    from './auth-signup.service';
import { UserService }          from '../../shared/user.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {

    constructor(
        private authSignupService:AuthSignupService,
        private router:Router,
        private userService:UserService
    ) { }

    user: User = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    authenticatedUser: any;
    errorMessage: string;
    
    onSubmit({value, valid}: {value:User, valid:boolean}) {
        this.authSignupService.signup(value)
            .subscribe(
                response => {
                    this.userService.addSharedUser(response);
                    this.authenticatedUser = response;
                    alert('Реєстрація успішна');
                    this.router.navigate(['/']);
                },
                error => {
                    if (error.json().status_code === 401) {
                        this.errorMessage = <any>error.json();
                    } else if (error.json().status_code === 422) {
                        this.errorMessage = <any>error.json().errors;
                    }
                }
            );
    }
    
    ngOnInit() {
        this.userService.sharedUser$.subscribe(latestCollection => {
            this.authenticatedUser = latestCollection;
        });
        this.userService.loadSharedUser();
    }
}