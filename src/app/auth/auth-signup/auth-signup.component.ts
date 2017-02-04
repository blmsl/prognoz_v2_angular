import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { AuthSignupInterface }                  from './auth-signup.interface';
import { UserService }                          from '../../shared/user.service';

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
    captchaValidity: boolean = false;

    signupForm: FormGroup;
    
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

        let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.signupForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            password_confirmation: new FormControl('', [Validators.required]),
        });
    }

    logout() {
        this.userService.logoutRequest().subscribe(result => {});
        this.userService.logout();
        this.authenticatedUser = false;
        this.userService.addSharedUser(false);
        this.notificationService.info('Успішно', 'Ви вийшли зі свого аккаунту');
    }

    resolved(captchaResponse: string) {
        if (captchaResponse) {
            this.captchaValidity = true;
        }
    }
}