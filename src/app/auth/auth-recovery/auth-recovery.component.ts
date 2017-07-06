import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';

import { AuthService }                          from '../../shared/auth.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-recovery',
  templateUrl: './auth-recovery.component.html',
  styleUrls: ['./auth-recovery.component.css']
})
export class AuthRecoveryComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private notificationService: NotificationsService
    ) { }

    user: User = this.currentStateService.user;
    recoveryForm: FormGroup;
    spinner: boolean = false;
  
    ngOnInit() {
        this.authService.getUser.subscribe(result => this.user = result);
        let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.recoveryForm = new FormGroup({
            email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)])
        });
    }

    onSubmit() {
        if (this.recoveryForm.valid) {
            this.spinner = true;
            this.authService.recovery(this.recoveryForm.value.email)
                .subscribe(
                    response => {
                        this.notificationService.success('Успішно', 'Подальші інструкції відправлено на ваш email', {timeOut: 0});
                        this.recoveryForm.get('email').disable();
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
}
