import { Component, OnInit }                    from '@angular/core';
import { Router, ActivatedRoute, Params }       from '@angular/router';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { NotificationsService }                 from 'angular2-notifications';

import { GuestbookService }                     from './guestbook.service';
import { UserService }                          from '../shared/user.service';
import { API_IMAGE_USERS, IMAGE_USER_DEFAULT }  from '../shared/app.settings';

@Component({
    selector: 'app-guestbook',
    templateUrl: './guestbook.component.html',
    styleUrls: ['./guestbook.component.css']
})
export class GuestbookComponent implements OnInit {

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private guestbookService: GuestbookService,
        private userService: UserService,
        private formBuilder: FormBuilder,
        private notificationService: NotificationsService
    ) { }

    guestbookMessages: any;
    error: string | Array<string>;
    spinnerButton: boolean = false;
    spinnerMessages: boolean = false;
    userImagesUrl: string = API_IMAGE_USERS;
    userImageDefault: string = IMAGE_USER_DEFAULT;

    path: string = '/guestbook/page/';
    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    guestbookAddMessageForm: FormGroup;
    authenticatedUser: any;

    ngOnInit() {
        this.authenticatedUser = this.userService.sharedUser;
        this.spinnerMessages = true;
        this.activatedRoute.params.subscribe((params: Params) => {
            this.guestbookService.getGuestbookMessages(params['number']).subscribe(
                result => {
                    if (!result.data) {
                        this.error = "В базі даних повідомлень немає";
                    } else {
                        this.currentPage = result.current_page;
                        this.lastPage = result.last_page;
                        this.perPage = result.per_page;
                        this.total = result.total;
                        this.guestbookMessages = result.data;
                    }
                    this.spinnerMessages = false;
                },
                error => {
                    this.error = error;
                    this.spinnerMessages = false;
                }
            )
        });
        
        if (this.authenticatedUser) {
            this.guestbookAddMessageForm = this.formBuilder.group({
                user_id: [this.authenticatedUser.id, [Validators.required]],
                body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
            });
        }
    }
    
    onSubmit() {
        this.spinnerButton = true;
        this.guestbookService.create(this.guestbookAddMessageForm.value).subscribe(
            response => {
                this.guestbookMessages = response.data;
                this.currentPage = response.current_page;
                this.lastPage = response.last_page;
                this.perPage = response.per_page;
                this.total = response.total;
                this.router.navigate(['/guestbook']);
                this.notificationService.success('Успішно', 'Повідомлення додано');
                this.guestbookAddMessageForm.patchValue({body: ''});
                this.guestbookAddMessageForm.get('body').markAsUntouched();
                this.guestbookAddMessageForm.get('body').markAsPristine();
                this.spinnerButton = false;
            },
            errors => {
                for (let error of errors) {
                    this.notificationService.error('Помилка', error);
                }
                this.spinnerButton = false;
            }
        );
    }
}
