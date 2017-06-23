import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { AuthService }                          from '../../shared/auth.service';

@Component({
  selector: 'app-auth-recovery',
  templateUrl: './auth-recovery.component.html',
  styleUrls: ['./auth-recovery.component.css']
})
export class AuthRecoveryComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService
    ) { }

    recoveryForm: FormGroup;
    spinner: boolean = false;
  
    ngOnInit() {
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
