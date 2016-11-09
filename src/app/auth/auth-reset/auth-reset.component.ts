import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { NotificationsService }                 from 'angular2-notifications';

import { UserService }                          from '../../shared/user.service';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './auth-reset.component.html',
  styleUrls: ['./auth-reset.component.css']
})
export class AuthResetComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private userService: UserService,
        private notificationService: NotificationsService
    ) { }
  
    resetForm: FormGroup;

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetForm = new FormGroup({
                email: new FormControl('', [Validators.required]),
                password: new FormControl('', [Validators.required]),
                password_confirmation: new FormControl('', [Validators.required]),
                token: new FormControl(params['token'], [Validators.required])
            });
        });
    }

    onSubmit() {
        this.userService.reset(this.resetForm.value).subscribe(
            response => {
                this.router.navigate(['/signin']);
                this.notificationService.success('Успішно', 'Відновлення паролю пройшло успішно. Тепер ви можете виконати вхід на сайт. ');
            },
            error => {
                if (error.json().status_code === 404){
                    this.notificationService.error('Помилка', error.json().message);
                } else if(error.json().status_code === 422) {
                    if (error.json().errors.email) this.notificationService.error('Помилка', error.json().errors.email);
                    if (error.json().errors.password) this.notificationService.error('Помилка', error.json().errors.password);
                }
            }
        );
    }
}
