import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { NotificationsService }                 from 'angular2-notifications';

import { AuthService }                          from '../../shared/auth.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { User }                                 from '../../shared/models/user.model';

@Component({
  selector: 'app-auth-reset',
  templateUrl: './auth-reset.component.html',
  styleUrls: ['./auth-reset.component.css']
})
export class AuthResetComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private notificationService: NotificationsService
    ) { }

    user: User = this.currentStateService.user;
    resetForm: FormGroup;
    spinner: boolean = false;

    ngOnInit() {
        this.authService.getUser.subscribe(result => this.user = result);
        let emailRegex = '^[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetForm = new FormGroup({
                email: new FormControl('', [Validators.required, Validators.pattern(emailRegex)]),
                password: new FormControl('', [Validators.required, Validators.minLength(6)]),
                password_confirmation: new FormControl('', [Validators.required]),
                token: new FormControl(params['token'], [Validators.required])
            });
        });
    }

    onSubmit() {
        if (this.resetForm.valid) {
            this.spinner = true;
            this.authService.reset(this.resetForm.value).subscribe(
                response => {
                    this.notificationService.success('Успішно', 'Відновлення паролю пройшло успішно. Тепер ви можете виконати вхід на сайт.', {timeOut: 0});
                    this.spinner = false;
                    this.router.navigate(['/signin']);
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
