import { Component, OnInit }                    from '@angular/core';
import { Router }                               from '@angular/router';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { UserService }                          from '../../shared/user.service';

@Component({
  selector: 'app-auth-recovery',
  templateUrl: './auth-recovery.component.html',
  styleUrls: ['./auth-recovery.component.css']
})
export class AuthRecoveryComponent implements OnInit {

    constructor(
        private router: Router,
        private userService: UserService,
        private notificationService: NotificationsService
    ) { }

    recoveryForm: FormGroup;
  
    ngOnInit() {
        this.recoveryForm = new FormGroup({
            email: new FormControl('', [Validators.required])
        });
    }

    onSubmit() {
        this.userService.recovery(this.recoveryForm.value.email)
            .subscribe(
                result => {
                    this.router.navigate(['/']);
                    this.notificationService.success('Успішно', 'Подальші інструкції відправлено на ваш email');
                },
                error => {
                    if (error.json().status_code === 404){
                        this.notificationService.error('Помилка', error.json().message);
                    } else if(error.json().status_code === 422) {
                        if (error.json().errors.email) this.notificationService.error('Помилка', error.json().errors.email);
                    }
                }
            )
    }
}
