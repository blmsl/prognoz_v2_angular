import { Component, OnInit }                    from '@angular/core';
import { FormControl, FormGroup, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';
import { NotificationsService }                 from 'angular2-notifications';

import { UserService }                          from '../shared/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(
        private userService: UserService,
        private router: Router,
        private notificationService: NotificationsService
    ) { }
    
    headerSigninForm: FormGroup;
    user: any;
    spinner: boolean = false;

    ngOnInit() {
        this.userService.sharedUser$.subscribe(latestCollection => {
            this.user = latestCollection;
        });
        this.userService.loadSharedUser();
        if (!this.user) this.user = JSON.parse(localStorage.getItem('user'));
        
        this.headerSigninForm = new FormGroup({
            name: new FormControl('', [Validators.required, Validators.minLength(3)]),
            password: new FormControl('', [Validators.required])
        });
    }
    
    onSubmit({value, valid}: {value:any, valid:boolean}) {
        this.spinner = true;
        this.userService.login(value.name, value.password)
            .subscribe(
                result => {
                    if (result) {
                        this.user = result;
                        this.userService.addSharedUser(result);
                        this.router.navigate(['/']);
                        this.notificationService.success('Успішно', 'Вхід виконано успішно');
                    }
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
    
    logout() {
        this.userService.logoutRequest().subscribe(result => {});
        this.userService.logout();
        this.user = false;
        this.userService.addSharedUser(false);
        this.notificationService.info('Успішно', 'Ви вийшли зі свого аккаунту');
        this.router.navigate(['/']);
    }
}
