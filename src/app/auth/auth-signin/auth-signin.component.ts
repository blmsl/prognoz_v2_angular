import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { AuthService }                          from '../../shared/auth.service';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css']
})
export class AuthSigninComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService
    ) { }

    user: User;
    errorMessage: string;
    signInForm: FormGroup;
    spinner: boolean = false;

    ngOnInit() {
        this.authService.getUser.subscribe(result => {
            this.user = result;
        });

        this.signInForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit(signInForm: FormGroup) {
        if (signInForm.valid) {
            this.spinner = true;
            this.authService.signIn(signInForm.value.name, signInForm.value.password)
                .subscribe(
                    response => {
                        this.notificationService.success('Успішно', 'Вхід виконано успішно');
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
}