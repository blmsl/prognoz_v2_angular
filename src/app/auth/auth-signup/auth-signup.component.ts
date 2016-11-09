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
    
    onSubmit({value, valid}: {value:AuthSignupInterface, valid:boolean}) {
        this.userService.registration(value)
            .subscribe(
                response => {
                    this.userService.addSharedUser(response);
                    this.authenticatedUser = response;
                    this.router.navigate(['/']);
                    this.notificationService.success('Успішно', 'Реєстрація пройшла успішно');
                },
                error => {
                    if (error.json().status_code === 401){
                        this.notificationService.error('Помилка', error.json().message);
                    } else if(error.json().status_code === 422) {
                        if (error.json().errors.name) this.notificationService.error('Помилка', error.json().errors.name);
                        if (error.json().errors.email) this.notificationService.error('Помилка', error.json().errors.email);
                        if (error.json().errors.password) this.notificationService.error('Помилка', error.json().errors.password);
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