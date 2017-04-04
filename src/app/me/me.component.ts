import { Component, OnInit }                                    from '@angular/core';
import { FormBuilder, FormGroup, Validators }                   from '@angular/forms';
import { NotificationsService }                                 from 'angular2-notifications';
import { Router }                                               from '@angular/router';

import { UserService }                                          from '../shared/user.service';
import { ImageService }                                         from '../shared/image.service';
import { environment }                                          from '../../environments/environment';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit {

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private notificationService: NotificationsService,
        private userService: UserService,
        private imageService: ImageService
    ) {
        imageService.uploadedImage$.subscribe(
            result => {
                this.userEditForm.patchValue({image: result});
                this.errorImage = null;
            }
        );
        imageService.uploadError$.subscribe(
            result => { this.errorImage = result }
        );
    }

    error: string | Array<string>;
    spinner: boolean = false;
    authenticatedUser: any = null;
    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    userEditForm: FormGroup;
    errorImage: string;
    hasUnsavedChanges: boolean = false;
  
    ngOnInit() {
        this.authenticatedUser = Object.assign({}, this.userService.sharedUser);

        this.userEditForm = this.formBuilder.group({
            id: [this.authenticatedUser.id],
            first_name: [this.authenticatedUser.first_name, [Validators.maxLength(50)]],
            hometown: [this.authenticatedUser.hometown, [Validators.maxLength(50)]],
            favorite_team: [this.authenticatedUser.favorite_team, [Validators.maxLength(50)]],
            image: [''],
        });
    }

    onSubmit() {
        this.spinner = true;
        this.userService.update(this.userEditForm.value).subscribe(
            response => {
                this.notificationService.success('Успішно', 'Ваш профіль змінено!');
                this.spinner = false;
                this.hasUnsavedChanges = false;
                this.userService.initializeUser();
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
                this.hasUnsavedChanges = false;
                this.spinner = false;
            }
        );
    }
    
    fileChange(event) {
        this.hasUnsavedChanges = true;
        this.imageService.fileChange(event, environment.IMAGE_SETTINGS.USER);
    }
}
