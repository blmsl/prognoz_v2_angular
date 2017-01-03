import { Component, OnInit }                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { UserService }                          from '../shared/user.service';
import { API_IMAGE_USERS }                      from '../shared/app.settings';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService,
        private userService: UserService
    ) { }

    error: string | Array<string>;
    spinner: boolean = false;
    authenticatedUser: any = null;
    userImagesUrl: string = API_IMAGE_USERS;
    userEditForm: FormGroup;
  
    ngOnInit() {
        if (this.userService.sharedUser) {
            this.authenticatedUser = Object.assign({}, this.userService.sharedUser);

            this.userEditForm = this.formBuilder.group({
                id: [this.authenticatedUser.id],
                first_name: [this.authenticatedUser.first_name, [Validators.maxLength(50)]],
                hometown: [this.authenticatedUser.hometown, [Validators.maxLength(50)]],
                favorite_team: [this.authenticatedUser.favorite_team, [Validators.maxLength(50)]],
            });
        }
    }

    onSubmit() {
        this.spinner = true;
        this.userService.update(this.userEditForm.value).subscribe(
            response => {
                this.notificationService.success('Успішно', 'Ваш профіль змінено!');
                this.spinner = false;
                // this.userService.initializeUser();
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
