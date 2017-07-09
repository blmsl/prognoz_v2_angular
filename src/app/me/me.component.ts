import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { Router }                               from '@angular/router';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../shared/auth.service';
import { CurrentStateService }                  from '../shared/current-state.service';
import { environment }                          from '../../environments/environment';
import { ImageService }                         from '../shared/image.service';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../shared/models/user.model';
import { UserService }                          from '../shared/user.service';

@Component({
    selector: 'app-me',
    templateUrl: './me.component.html',
    styleUrls: ['./me.component.css']
})
export class MeComponent implements OnInit, OnDestroy {

    constructor(
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private formBuilder: FormBuilder,
        private imageService: ImageService,
        private notificationService: NotificationsService,
        private router: Router,
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

    authenticatedUser: User = Object.assign({}, this.currentStateService.user);
    spinnerButton: boolean = false;
    userSubscription: Subscription;
    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;
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
        this.spinnerButton = true;
        this.userService.updateUser(this.userEditForm.value).subscribe(
            response => {
                this.authService.initializeUser();
                this.notificationService.success('Успішно', 'Ваш профіль змінено!');
                this.spinnerButton = false;
                this.hasUnsavedChanges = false;
            },
            errors => {
                errors.forEach(error => this.notificationService.error('Помилка', error));
                this.hasUnsavedChanges = false;
                this.spinnerButton = false;
            }
        );
    }
    
    fileChange(event) {
        this.hasUnsavedChanges = true;
        this.imageService.fileChange(event, environment.imageSettings.user);
    }
}
