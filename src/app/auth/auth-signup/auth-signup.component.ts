import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { AuthSignupInterface }  from './auth-signup.interface';
import { UserService }          from '../../shared/user.service';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {

    constructor(
        private router: Router,
        private userService: UserService,
        private notificationService: NotificationsService
    ) { }

    user: AuthSignupInterface = {
        name: '',
        email: '',
        password: '',
        password_confirmation: ''
    };
    authenticatedUser: any;
    spinner: boolean = false;
    
    onSubmit({value, valid}: {value:AuthSignupInterface, valid:boolean}) {
        this.spinner = true;
        this.userService.registration(value)
            .subscribe(
                response => {
                    this.userService.addSharedUser(response);
                    this.authenticatedUser = response;
                    this.router.navigate(['/']);
                    this.notificationService.success('Успішно', 'Реєстрація пройшла успішно');
                    this.spinner = false;
                },
                errors => {
                    for (let error of errors) {
                        this.notificationService.error('Помилка', error);
                    }
                    this.spinner = false;
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