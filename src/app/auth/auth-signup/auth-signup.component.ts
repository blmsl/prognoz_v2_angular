import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { AuthService }                          from '../../shared/auth.service';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.css']
})
export class AuthSignupComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService
    ) { }

    user: User;
    spinner: boolean = false;
    captchaValidity: boolean = false;
    signUpForm: FormGroup;

    ngOnInit() {
        this.authService.getUser.subscribe(result => {
            this.user = result;
        });
        let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.signUpForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(50)]),
            email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
            password: new FormControl('', [Validators.required, Validators.minLength(6)]),
            password_confirmation: new FormControl('', [Validators.required]),
        });
    }
    
    onSubmit(signUpForm: FormGroup) {
        if (signUpForm.valid) {
            this.spinner = true;
            this.authService.signUp(signUpForm.value).subscribe(
                response => {
                    this.notificationService.success('Успішно', 'Реєстрація пройшла успішно', {timeOut: 0});
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
    }

    logout() {
        this.authService.logout().subscribe(
            response => {
                this.notificationService.info('Успішно', 'Ви вийшли зі свого аккаунту');
            },
            error => {
                this.notificationService.error('Помилка', error);
            }
        );
    }

    resolved(captchaResponse: string) {
        if (captchaResponse) {
            this.captchaValidity = true;
        }
    }
}