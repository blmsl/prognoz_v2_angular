import { Component, OnInit, OnDestroy }         from '@angular/core';
import { Router }                               from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../shared/auth.service';
import { CurrentStateService }                  from '../shared/current-state.service';
import { ImageService }                         from '../shared/image.service';
import { UserService }                          from '../shared/user.service';
import { User }                                 from '../shared/models/user.model';
import { environment }                          from '../../environments/environment';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit, OnDestroy {

    constructor(
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService,
        private router: Router,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private imageService: ImageService,
        private userService: UserService
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
    authenticatedUser: User = Object.assign({}, this.currentStateService.user);
    userSubscription: Subscription;
    userImagesUrl: string = environment.API_IMAGE_USERS;
    userImageDefault: string = environment.IMAGE_USER_DEFAULT;
    userEditForm: FormGroup;
    errorImage: string;
    hasUnsavedChanges: boolean = false;
  
    ngOnInit() {
        this.userSubscription = this.authService.getUser.subscribe(result => {
            if (!result) {
                this.router.navigate(['/403']);
            }
            this.authenticatedUser = Object.assign({}, result);
        });

        this.userEditForm = this.formBuilder.group({
            id: [this.authenticatedUser.id],
            first_name: [this.authenticatedUser.first_name, [Validators.maxLength(50)]],
            hometown: [this.authenticatedUser.hometown, [Validators.maxLength(50)]],
            favorite_team: [this.authenticatedUser.favorite_team, [Validators.maxLength(50)]],
            image: [''],
        });
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    onSubmit() {
        this.spinner = true;
        this.userService.update(this.userEditForm.value).subscribe(
            response => {
                this.notificationService.success('Успішно', 'Ваш профіль змінено!');
                this.spinner = false;
                this.hasUnsavedChanges = false;
                this.authService.initializeUser();
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
