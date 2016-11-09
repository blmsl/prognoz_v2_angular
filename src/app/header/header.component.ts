import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';
import { NotificationsService } from 'angular2-notifications';

import { UserService } from '../shared/user.service';

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
    user: any;

    //TODO: users from old database authentication
    //TODO: guestbook page

    onSubmit({value, valid}: {value:any, valid:boolean}) {
        this.userService.login(value.name, value.password)
            .subscribe(
                result => {
                    if (result) {
                        this.user = result;
                        this.userService.addSharedUser(result);
                        this.router.navigate(['/']);
                        this.notificationService.success('Успішно', 'Аутентифікація пройшла успішно');
                    }
                },
                error => {
                    if (error.json().status_code === 401){
                        this.notificationService.error('Помилка', error.json().message);
                    } else if(error.json().status_code === 422) {
                        if (error.json().errors.name) this.notificationService.error('Помилка', error.json().errors.name);
                        if (error.json().errors.password) this.notificationService.error('Помилка', error.json().errors.password);
                    }
                }
            );
    }
    
    ngOnInit() {
        this.userService.sharedUser$.subscribe(latestCollection => {
            this.user = latestCollection;
        });
        this.userService.loadSharedUser();
        if (!this.user) this.user = JSON.parse(localStorage.getItem('user'));
    }

    logout() {
        this.userService.logout();
        this.user = false;
        this.userService.addSharedUser(false);
        this.notificationService.success('Успішно', 'Ви вийшли зі свого аккаунту');
    }
}
