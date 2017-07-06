import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';

import { AuthService }                          from '../shared/auth.service';
import { environment }                          from '../../environments/environment';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../shared/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private authService: AuthService,
        private notificationService: NotificationsService
    ) { }

    headerSignInForm: FormGroup;
    sitelogo: string = environment.apiSiteLogo;
    spinner: boolean = false;
    user: User;

    ngOnInit() {
        this.authService.getUser.subscribe(result => this.user = result);
        this.headerSignInForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required])
        });
    }
    
    onSubmit() {
        if (this.headerSignInForm.valid) {
            this.spinner = true;
            this.authService.signIn(this.headerSignInForm.value.name, this.headerSignInForm.value.password)
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
                    });   
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
