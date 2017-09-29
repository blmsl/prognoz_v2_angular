import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';

import { AuthService }                          from '../../core/auth.service';
import { CurrentStateService }                  from '../../core/current-state.service';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.css']
})
export class AuthSigninComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private notificationService: NotificationsService,
        private router: Router
    ) { }

    signInForm: FormGroup;
    spinner: boolean = false;
    user: User = this.currentStateService.user;

    ngOnInit() {
        this.authService.getUser.subscribe(response => this.user = response);
        this.signInForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        if (this.signInForm.valid) {
            this.spinner = true;
            this.authService.signIn(this.signInForm.value.name, this.signInForm.value.password)
                .subscribe(
                    response => {
                        this.notificationService.success('Успішно', 'Вхід виконано успішно');
                        this.spinner = false;
                        this.router.navigate(['/championship/predictions']);
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
}