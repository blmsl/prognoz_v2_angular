import { Component, OnDestroy, OnInit }         from '@angular/core';
import { FormBuilder, FormGroup, Validators }   from '@angular/forms';
import { DomSanitizer }                         from '@angular/platform-browser';
import { ActivatedRoute, Params }               from '@angular/router';
import { Subscription }                         from 'rxjs/Subscription';

import { AuthService }                          from '../../shared/auth.service';
import { CurrentStateService }                  from '../../shared/current-state.service';
import { environment }                          from '../../../environments/environment';
import { GuestbookMessage }                     from '../../shared/models/guestbook-message.model';
import { GuestbookService }                     from '../shared/guestbook.service';
import { NotificationsService }                 from 'angular2-notifications';
import { User }                                 from '../../shared/models/user.model';

@Component({
    selector: 'app-guestbook-page',
    templateUrl: './guestbook-page.component.html',
    styleUrls: ['./guestbook-page.component.css']
})
export class GuestbookPageComponent implements OnInit, OnDestroy {

    constructor(
        private activatedRoute: ActivatedRoute,
        private authService: AuthService,
        private currentStateService: CurrentStateService,
        private domSanitizer: DomSanitizer,
        private formBuilder: FormBuilder,
        private guestbookService: GuestbookService,
        private notificationService: NotificationsService
    ) { }

    guestbookMessages: GuestbookMessage[];
    errorGuestbookMessages: string | Array<string>;
    spinnerGuestbookMessages: boolean = false;
    noGuestbookMessages: string = 'В базі даних повідомлень не знайдено.';

    userImagesUrl: string = environment.apiImageUsers;
    userImageDefault: string = environment.imageUserDefault;

    path: string = '/guestbook/page/';

    currentPage: number;
    lastPage: number;
    perPage: number;
    total: number;

    authenticatedUser: User = this.currentStateService.user;
    userSubscription: Subscription;

    addGuestbookMessageForm: FormGroup;
    spinnerButton: boolean = false;

    ngOnInit() {
        this.addGuestbookMessageForm = this.formBuilder.group({
            user_id: ['', [Validators.required]],
            body: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]]
        });
        this.userSubscription = this.authService.getUser.subscribe(result => {
            this.authenticatedUser = result;
            this.addGuestbookMessageForm.patchValue({user_id: (result ? result.id : '')});
        });
        this.getGuestbookMessagesData();
    }

    ngOnDestroy() {
        if (!this.userSubscription.closed) {
            this.userSubscription.unsubscribe();
        }
    }

    private getGuestbookMessagesData() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.resetData();
            this.spinnerGuestbookMessages = true;
            this.guestbookService.getGuestbookMessages(params['number']).subscribe(
                result => {
                    if (result) {
                        this.currentPage = result.current_page;
                        this.lastPage = result.last_page;
                        this.perPage = result.per_page;
                        this.total = result.total;
                        this.guestbookMessages = result.data;
                        let userId = this.authenticatedUser ? this.authenticatedUser.id.toString() : '';
                        this.addGuestbookMessageForm.patchValue({user_id: userId});
                    }
                    this.spinnerGuestbookMessages = false;
                },
                error => {
                    this.errorGuestbookMessages = error;
                    this.spinnerGuestbookMessages = false;
                }
            )
        });
    }

    onSubmit() {
        this.spinnerButton = true;
        this.guestbookService.createGuestbookMessage(this.addGuestbookMessageForm.value)
            .subscribe(
                response => {
                    this.getGuestbookMessagesData();
                    this.spinnerButton = false;
                    this.addGuestbookMessageForm.reset({user_id: this.authenticatedUser.id});
                    this.notificationService.success('Успішно', 'Повідомлення додано');
                },
                errors => {
                    for (let error of errors) {
                        this.notificationService.error('Помилка', error);
                    }
                    this.spinnerButton = false;
                }
            );
    }

    private resetData() {
        this.guestbookMessages = null;
        this.errorGuestbookMessages = null;
    }

    assembleHTMLItem(message: string) {
        return this.domSanitizer.bypassSecurityTrustHtml(message);
    }
}