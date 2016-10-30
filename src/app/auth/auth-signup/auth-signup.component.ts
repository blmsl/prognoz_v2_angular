import { Component }    from '@angular/core';
import { Router }       from '@angular/router';

import { User }                 from './auth-signup.interface';
import { AuthSignupService }    from './auth-signup.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent {

    constructor(
        private authSignupService: AuthSignupService,
        private router: Router
    ) { }

    user: User = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    errorMessage: string;

    onSubmit({value, valid}: {value: User, valid: boolean}) {
        this.authSignupService.signup(value)
            .subscribe(
                response => {
                    let token = response.token;
                    let currentUser = JSON.stringify(response.currentUser);
                    this.authSignupService.setTokenToLocalStorage(token);
                    this.authSignupService.setUserToLocalStorage(currentUser);
                    //TODO: implement header component reload, delete Injectable from service;
                },
                error => {
                    if(error.json().status_code === 401) {
                        this.errorMessage = <any>error.json();
                    } else if(error.json().status_code === 422) {
                        this.errorMessage = <any>error.json().errors;
                    }
                }
            );
    }
    
}
